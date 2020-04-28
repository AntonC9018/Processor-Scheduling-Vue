import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// name is optional
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/simulation',
    name: 'Simulation',
    component: () => import('../views/Test.vue')
  },
  {
    path: '/exlanations',
    name: 'Explicații',
    component: () => import('../views/Explanations.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
