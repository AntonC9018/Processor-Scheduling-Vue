<template>
  <div class="container">
    <div>
      <vue-markdown :source="text"></vue-markdown>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  data () {
    return {
      text: require("../markdown/expl.md").default
    }
  },
  components: {
    VueMarkdown
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
.container > .div {
  padding: 15px;
}
@media only screen and (max-width: 800px) {
  .container {
    display: block;
    width: 100%;
    margin-right: 0;
    margin-left: 0;
  }
}
</style>