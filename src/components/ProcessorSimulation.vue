<template>
  <h>{{ computedStates.length }}</h>
</template>

<script>
export default {
  props: ['initial-state', 'processor'],
  data: function() {
    return {
      prevState: null,
      state: null,
    }
  },
  methods: {
    setState: function(state) {
      this.prevState = this.state
      this.state = state
    },
    returnToStart: function() {
      this.state = this.computedStates[0]
    }
  },
  computed: {
    computedStates: function () {
      if (!this.processor || !this.initialState) {
        return []
      }
      return this.processor.computeStates(
        this.initialState
      )
    },
  }
}
</script>