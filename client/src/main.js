import Vue from 'vue'
import App from './App'
import router from './router'

import VueFire from 'vuefire'
import firebase from 'firebase'
// buat import store
import store from './vuex/store'

Vue.use(VueFire)
Vue.config.productionTip = false

var config = {
  apiKey: 'AIzaSyCfUDFkgzFt_Nzq7hJjX_DQmQE5KuNXw3g',
  authDomain: 'websocket-slide-ba8fd.firebaseapp.com',
  databaseURL: 'https://websocket-slide-ba8fd.firebaseio.com',
  projectId: 'websocket-slide-ba8fd',
  storageBucket: 'websocket-slide-ba8fd.appspot.com',
  messagingSenderId: '258066709342'
}

firebase.initializeApp(config)

Vue.prototype.$db = firebase.database()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
