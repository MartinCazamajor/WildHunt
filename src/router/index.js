import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Hunt from '../views/Hunt.vue'
import VueSimpleAlert from "vue-simple-alert"

Vue.use(VueSimpleAlert)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
  {
    path: '/hunt/:name/:long/:lat',
    name: 'hunt',
    component: Hunt
  }
]

const router = new VueRouter({
  routes
})

export default router
