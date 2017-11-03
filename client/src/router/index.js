import Vue from 'vue'
import Router from 'vue-router'
import Utama from '@/components/Utama'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Utama',
      component: Utama
    }
  ]
})
