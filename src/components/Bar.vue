<template>
  <div class="bar-container" 
    v-bind:style="{ 'background-color': backgColor || 'rgb(41.7%, 41.7%, 91.3%)' }"
  >
    <div v-bind:style="cssProgress" class="bar">
      <div class="progress">{{ this.progress }}/{{ this.scale }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['progress', 'scale', 'color', 'backg-color', 'transitionSpeed'],
  // data() {
  //   return {

  //   }
  // },
  computed: {
    progressCoeff: function() {
      return this.progress / this.scale
    },
    cssProgress: function() {
      return {
        'background-color': this.color || 'rgb(98%, 37.8%, 50.8%)',
        width: this.progressCoeff * 100 + '%',
        transition: `${this.transitionSpeed || 500}ms linear all`
      }
    }
  }
}
</script>

<style scoped>
.bar-container {
  width: 100%;
  border: 1px solid grey;
  /* display: flex; */
  text-align: center;
}
.bar {
  height: 50%;
}
</style>