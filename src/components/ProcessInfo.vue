<template>
  <div class="container">
    <div class="id">{{ process.id + 1 }}</div>
    <div class="bar"><div><bar 
      :progress="process.remainedTime"
      :scale="process.executionTime"
      :transitionSpeed="transitionSpeed"
    ></bar></div></div>
  </div>
</template>

<script>
import Bar from './Bar'

export default {
  props: ['process', 'transitionSpeed'],
  components: {
    Bar
  }
}
</script>


<style scoped>
.container {
  /* display: inline; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(66.9%, 91.7%, 83.2%);
  border: 1px solid black;
}
.id {
  padding: 5px;
  text-align: center;
  /* display: flex; */
  width: 5%;
}
.bar {
  padding: 5px;
  width: 80%;
}
</style>