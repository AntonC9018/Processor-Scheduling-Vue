<template>
  <div>
    <vue-slider
      v-model="timeValue"
      v-bind:min="0"
      v-bind:max="totalTime"
    >
    </vue-slider>
    <!-- <vue-slider
      :drag-on-click="false"
      :clickable="false"
      :disabled="true"
      v-bind:value="value"
      :min="0"
      v-bind:max="nextState.timestamp - state.timestamp"
    >
    </vue-slider> -->
    <div class="play">      
      <div
        v-if="playing" 
        class="pause-button"
        @click="pause"
      ></div>
      <div 
        v-else
        class="play-button"
        @click="play"
      ></div>
    </div>
    <div class="working">
      <cog
        v-bind:time="time - this.stallTime"
        v-bind:transitionSpeed="timerSpeed"
      >
      </cog>
      <div v-if="activeProcess">
        <div>Working on process...</div><br>
        <process-info 
          class="active-process"          
          v-bind:process="activeProcessInterpolated"
          v-bind:transitionSpeed="timerSpeed / 2"
        >      
        </process-info>
      </div>
      <div v-else>
        <div>Waiting for processes to arrive</div>
      </div>
    </div>

    <div class="tables-title">Tables</div>
    <div class="tables">
      <div 
        v-for="pData in psData"
        v-bind:key="pData.title"
        class="process-table"
      >
        <div>{{ pData.title }}</div>
        <div
          v-for="p in pData.ps"
          v-bind:key="p.id"
          class="process"
        >
        <process-info
          v-bind:process="p"
          v-bind:transitionSpeed="timerSpeed"
        />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import Cog from './Cog'
// import BarSlider from './BarSlider'
import ProcessInfo from './ProcessInfo'
import { Process } from '../scripts/algo.js'

export default {
  props: ['initial-state', 'processor'],
  data () {
    return {
      timeValue: 0,
      time: 0,
      value: 0,
      timerSpeed: 1000,
      playing: false
    }
  },
  watch: {
    timeValue: function() {
      this.time = this.timeValue
      this.value = this.nextTimestamp - this.time
    }
  },
  computed: {
    index: function() {
      let arr = this.states.processorStates
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].timestamp <= this.time) {
          return i;
        }
      }
      return 0;
    },
    states: function () {
      return this.processor.computeStates(
        this.initialState
      )
    },
    totalTime: function() {
      return this.lastState.timestamp
    },
    activeProcess: function() {
      return this.states.actives[this.index]
    },
    state: function() {
      let ps = this.states.processorStates[this.index]
      let a = this.states.actives[this.index]
      return {
        coming: ps.coming,
        waiting: ps.waiting,
        finished: ps.finished,
        timestamp: ps.timestamp,
        active: a
      }
    },
    nextState: function() {
      return this.states.processorStates[
        this.index < this.states.processorStates.length - 1
        ? this.index + 1
        : this.index]
    },
    nextTimestamp: function() {
      return this.nextState.timestamp
    },
    lastState: function() {
      return this.states.processorStates[this.states.processorStates.length - 1]
    },
    psData: function() {
      return [
        { 
          title: "Finished", 
          ps: this.state.finished 
        },
        { 
          title: "Waiting",
          ps: this.state.waiting
        },
        {
          title: "Coming",
          ps: this.state.coming
        }
      ]
    },
    activeProcessNextStep: function() {
      return this.nextState.waiting.filter(
        p => p.id == this.activeProcess.id
      )[0]
    },
    activeProcessInterpolated: function() {
      if (this.activeProcess == null) {
        return null;
      }
      let p = new Process({
        id: this.activeProcess.id,
        arrivalTime: this.activeProcess.arrivalTime,
        executionTime: this.activeProcess.executionTime
      })
      p.remainedTime = 
        (this.activeProcessNextStep ? this.activeProcessNextStep.remainedTime : 0) 
        + this.nextTimestamp - this.time
      return p
    },
    stallTime: function() {
      let a = 0
      for (let i = 1; i < this.index; i++) {
        if (!this.states.actives[i]) {
          a += this.states.processorStates[i + 1].timestamp
          a -= this.states.processorStates[i].timestamp
        }
      }
      if (this.nextTimestamp !== this.state.timestamp) {
        if (!this.states.actives[this.index]) {
          a += this.time
          a -= this.state.timestamp
        }
      }
      return a;
    }
  }, 
  methods: {
    toggle: function(playing) {
      this.playing = playing
    },
    play: function() {
      if (this.timeValue == this.totalTime) {
        this.timeValue = 0
        return;
      }
      this.toggle(true)
      let incrementTime = 
        () => this.timeValue < this.totalTime ? this.timeValue += 1 : this.pause()
      this.timer = setInterval(incrementTime, this.timerSpeed)
      incrementTime();
    },
    pause: function() {
      this.toggle(false)
      clearInterval(this.timer)
    }
  },
  components: {
    Cog,
    VueSlider,
    ProcessInfo 
  }
}
</script>


<style scoped>
.process {
  /* min-width: 100px; */
  height: 30px;
}
.active-process {
  background-color: rgb(46.8%, 90.5%, 40.3%);
  width: 200px;
}
.process-table {
  list-style: none;
}
.tables {
  display: flex;
  height: 400px;
}
.tables > div {
  text-align: center;
  /* border: 1px solid black; */
  width: calc(500px / 3 - 20px);
  padding: 10px;
}
@media only screen and (max-width: 500px) {
  .tables > div {
    width: 100%;
  }
}
.tables > div > div {
  margin-top: 5px;
}
.working {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.tables-title {
  width: 100%;
  text-align: center;
  font-weight: bold;
}
.play {
  width: 100%;
  display: flex;
  justify-content: center;
}
.play > div {
  border-radius: 50%;
  cursor: pointer;
  width: 100px;
  height: 100px;
  background-size: 100px;
}
.pause-button {
  background-image: url("../assets/pause.png");
}
.play-button {
  background-image: url("../assets/play.png");
}
</style>