<template>
  <div class="container">
    <div>
      <h1>Processor Scheduling Algorithms Simulation</h1>
      <p class="text">Hi! To see the simulations in action, turn to the <a href="./#/simulation">Simulation</a> page! Select an algorithm, add more processes and then hit <button class="compute">Compute!</button> to see the algorithm in action. Slide the slider around to get to a specific point into the simulation or hit the play button to see it <span class="rainbow rainbow_text_animated">play out all by itself!</span>
      </p>
      
      <p>Right now there are {{ processes.length }} algorithms available for choice:</p> 
      <ul>
        <li v-for="(p, i) in processes" :key="'algo' + i">
          {{ p.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      processes: [
        {
          name: "First Come First Served (FCFS)"
        },
        {
          name: 'Round Robin'
        },
        {
          name: 'Shortest Job First (SJF)'
        },
        {
          name: 'Shortest Remaining Time'
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  width: 800px;
  margin-right: calc((100% - 800px) / 2);
  margin-left: calc((100% - 800px) / 2);
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 800px) {
  .container {
    width: 100%;
    margin: 0;
  }
}
.compute {
  width: 100px;
  height: 25px;
  border: 0;
  /* border-radius: 8%; */
  background-color: rgb(9.9%, 69.1%, 61.9%);
  color: white;
}
.rainbow_text_animated {
  font-weight: bold;
  background: linear-gradient(to right, #6666ff, #0099ff , #00ff00, #ff3399, #6666ff);
  background-clip: text;
  color: transparent;
  animation: rainbow_animation 6s ease-in-out infinite;
  background-size: 400% 100%;
}

@keyframes rainbow_animation {
  0%,100% {
    background-position: 0 0;
  }

  50% {
    background-position: 100% 0;
  }
}
</style>
