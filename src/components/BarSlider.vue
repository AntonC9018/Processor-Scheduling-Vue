<template>
  <div>
    <div class="back" @click="back">
      <div>&lt;</div>
    </div>
    <vue-slider 
      v-model="value"
      v-bind:max="scale"
      v-bind:min="0"/>
    <div class="next" @click="next">
      <div>&gt;</div>
    </div>
  </div>
</template>


<script>

export default {
  props: [
    'progress', 'scale', 'color'
  ],
  data () {
    return {
      value: 0
    }
  },
  components: {
    VueSlider
  },
  watch: {
    progress: function() {
      this.value = this.progress
    }
  },
  computed: {
    enableLeft: function() {
      return this.value == 0;
    },
    enableRight: function() {
      return this.value == this.scale;
    }
  },
  methods: {
    next: function() {

    }
  }
}
</script>