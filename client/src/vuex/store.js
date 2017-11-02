import Vue from 'vue'
import Vuex from 'vuex'
// hapus
import VueFire from 'vuefire'
import firebase from 'firebase'
// import axios from 'axios'

// const http = axios.create({
//   baseURL: 'http://localhost:3000'
// })
Vue.use(VueFire)
Vue.use(Vuex)

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

const state = {
  pemain: []
}

const mutations = {
  addPengguna (state, payload) {
    state.pemain = payload
    console.log(payload)
  }
}

const actions = {
  addUser ({commit}) {
    Vue.prototype.$db.ref('wild-wild-west/user/').push({
      username: 'tester',
      point: '100'
    })
    .then(({data}) => {
      commit('addPengguna', data)
    })
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
