import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './vuex/store'

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000'
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
