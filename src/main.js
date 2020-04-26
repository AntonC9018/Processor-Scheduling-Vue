import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import VueLodash from 'vue-lodash'
// import lodash from 'lodash'
// Vue.use(VueLodash, { name: 'custom', lodash: lodash })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
