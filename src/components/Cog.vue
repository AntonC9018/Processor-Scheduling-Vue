<template>
  <div>
  <img 
    src="@/assets/settings.png"
    v-bind:style="rotate"
  >
  </div>
</template>

<script>
export default {
  props: ['time', 'transitionSpeed'],
  computed: {
    angle: function() {
      return this.time * 40;
    },
    rotate: function() {
      return {
        transform: `rotate(${this.angle}deg)`,
        transition: `${this.transitionSpeed || 1000}ms linear all`
      }
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
  max-width: 180px;
}
</style>