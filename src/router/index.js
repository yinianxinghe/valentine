import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/homeView',
    name: 'homeView',
    component: HomeView
  },
  {
    path: '/success',
    name: 'success',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/success.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
