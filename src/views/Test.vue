<template>
  <div class="container">
    <div class="processor">
      <div>
        <label>Select a processor</label><br>
        <select v-model="processorIndex">
          <option 
            v-for="(p, i) in processorsData" 
            :key="p[0]"
            :value="i"
          >{{ p[0] }}</option>
        </select>
      </div>
      <div v-if="processor && processor.params.length !== 0">
        <div
          v-for="param in processor.params"
          :key="param.name"
          class="param"
        >
          <label>{{ param.name }}</label><br>
          <input      
            v-model.number="processor[param.name]"
            type="number"
            min="1"
          >
        </div>
      </div>
    </div>
    <form @submit.prevent="createProcess">      
      <div class="time">
        <label>Arrival time </label>
        <input 
          v-model.number="newProcessData.arrivalTime" 
          type="number" 
          min="0"
          >
      </div>
      <div class="time">
        <label>Execution time </label>
        <input 
          v-model.number="newProcessData.executionTime" 
          type="number" 
          min="1" 
          v-bind:max="executionTimeLimit"
          >
      </div>      
      <div><input type="submit" value="Add" class="add-btn"></div>      
    </form>

    <table>
      <tr class="header">
        <th>Number</th>
        <th>Arrival Time</th>
        <th>Execution Time</th>
        <th>Click to remove</th>
      </tr>

      <tr v-for="(process, i) in processes" v-bind:key="process.id">
        <td>{{ i + 1 }}</td>
        <td>{{ process.arrivalTime }}</td> 
        <td>{{ process.executionTime }}</td> 
        <td @click="removeProcess(process.id)" class="delete-btn">Remove</td>
      </tr>

    </table>

    <button
      v-if="!simulationActive" 
      @click="startSimulation"
      class="compute-btn"
      >
      Compute!
    </button>

    <processor-simulation 
      v-if="simulationActive"
      v-bind:initial-state="initialState"
      v-bind:processor="processor"
      >
    </processor-simulation>
    <hr/>
  </div>
</template>


<script>
import ProcessorSimulation from '../components/ProcessorSimulation'
import { Process } from '../scripts/algo.js'
import processorsData from '../scripts/processors'

export default {
  data () {
    return {
      // linked to selection
      processorIndex: 0,
      processorsData,
      processors: processorsData.map(a => new a[1]),
      // list of added processes
      processes: [
        {
          id: 0,
          arrivalTime: 0,
          executionTime: 1
        },
        {
          id: 1,
          arrivalTime: 2,
          executionTime: 4
        },
        {
          id: 2,
          arrivalTime: 3,
          executionTime: 4
        },
      ].map(a => new Process(a)), // some fake data
      
      // this field contains the data that the user
      // enters for a new process
      newProcessData: {
        id: 3,
        arrivalTime: 0,
        executionTime: 0
      },

      // maximum executionTime allowed for a process
      // this is to stop people from freezing their
      // computer by setting enormous values
      executionTimeLimit: 50,

      simulationActive: false
    }
  },
  computed: {
    // instantiate the selected processor
    // see algo.js
    processor: function() {
      if (this.processors[this.processorIndex]) {
        return this.processors[this.processorIndex]
      }
      return null
    },


    // the initial state of the simulation would contain
    // all the processes to come, that is, all the specified
    // processes. Timestamp is zero, since we're always
    // starting from t = 0.
    initialState: function() {
      if (this.processes.length == 0) {
        return null
      }
      return {
        // sort processes according to the timestamp they arrive
        coming: this.processes.slice(0).sort((a, b) => a.arrivalTime - b.arrivalTime),
        waiting: [],
        finished: [],
        timestamp: 0
      }
    },

    
  },
  methods: {
    // turn process data into process object
    createProcess: function() {
      this.processes.push(
        new Process(this.newProcessData)
      )
      this.newProcessData.id = this.processes.length;
    },

    removeProcess: function(id) {

      // remove the process at that index (id == index)
      this.processes.splice(id, 1)

      // make all ids match the index
      this.processes.forEach((a, i) => a.id = i)
      this.newProcessData.id--

      // stop the simulation if there are no processes
      if (this.newProcessData.id == 0) {
        this.simulationActive = false
      }
    },

    startSimulation: function() {
      if (!this.processor) {
        alert('Select a processor!')
        return;
      }
      if (!this.initialState) {
        alert('Create processes first!')
        return;
      }
      this.simulationActive = true
    }
  },
  components: {
    ProcessorSimulation
  }
}
</script>


<style scoped>
.container {
  display: flex;
  width: 500px;
  margin-right: calc((100% - 500px) / 2);
  margin-left: calc((100% - 500px) / 2);
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 500px) {
  .container {
    width: 100%;
    margin: 0;
  }
}

.processor {
  /* text-align: center; */
  display: flex;
  justify-content: space-evenly;
  width: calc(100% - 20px);
  background-color: rgb(255, 227, 166);
  padding: 10px;
  height: calc(60px - 20px);
}

.param {
  text-align: center;
}

form {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 251, 194);
  width: 100%;
  height: 60px;
}

form > * {
  padding: 10px;
  text-align: center;
}

.time {
  max-width: 200px;
}

input[type="number"] {
  width: 30px;
}

.delete-btn {
  cursor: pointer;
  background: rgb(240, 124, 100);
  /* border-radius: 20%; */
  width: 75px;
  padding: 5px; 
  color: white;
  text-align: center;
}

table {
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100%;
  /* border-collapse: collapse; */
}

table.td {
  padding: 20px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.add-btn {
  cursor: pointer;
  width: 50px;
  height: 25px;
  border: none;
  background-color: rgb(152, 224, 139);
}

.compute-btn {
  width: 100px;
  height: 25px;
  border: 0;
  /* border-radius: 8%; */
  background-color: rgb(9.9%, 69.1%, 61.9%);
  color: white;
}

</style>