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
  pemain: [],
  datanya: [],
  trigerStart: false,
  count: '',
  datasatuan: [],
  datasatuansatu: [],
  status: false,
  oknum: ''
}

const mutations = {
  addPengguna (state, payload) {
    state.pemain = payload
  },
  ambilData (state, payload) {
    state.datanya = payload
  },
  ambilDataSatuan (state, payload) {
    state.datasatuan = payload
  },
  ambilDataSatuan1 (state, payload) {
    state.datasatuansatu = payload
  },
  mulai (state, payload) {
    let barunya = payload.status
    state.trigerStart = barunya
    // state.count = payload
  }

}

const actions = {
  addUser ({commit}) {
    Vue.prototype.$db.ref('wild-wild-west/user/').push({
      username: 'tester',
      point: 100
    })
    .then((data) => {
      // commit('addPengguna', data)
      console.log('kembalian', data.key)
    })
  },
  getUser ({commit}) {
    const ref = firebase.database().ref('wild-wild-west/user/')
    ref.on('value', (snap) => {
      commit('ambilData', snap.val())
      console.log(snap.val())
    })
  },
  upUser ({commit}, data) {
    if (data.point <= 0) {
      console.log('habis')
      state.status = !state.status
      state.oknum = data.username
    } else {
      Vue.prototype.$db.ref('wild-wild-west/user/' + data.id).set({
        username: data.username,
        point: data.point -= 20
      })
    }
  },
  deleteUser ({commit}, data) {
    console.log(data.id)
    Vue.prototype.$db.ref('wild-wild-west/user/' + data.id).remove()
  },
  mulai ({commit}, data) {
    // Vue.prototype.$db.ref('wild-wild-west/dataSatuan/').push({
    //   status: 'false'
    // })
    // .then((data) => {
    //   // commit('addPengguna', data)
    //   console.log('kembalian', data.key)
    // })
    Vue.prototype.$db.ref('wild-wild-west/dataSatuan/' + '-Ky-FGjLhDIz_ftXxEII').set({
      status: data
    })
    const ref = firebase.database().ref('wild-wild-west/dataSatuan/' + '-Ky-FGjLhDIz_ftXxEII')
    ref.on('value', (snap) => {
      // commit('ambilDataSatuan', snap.val())
      // console.log('berapa', snap.val().status)
      commit('mulai', snap.val())
    })
    // commit('mulai', data)
  },
  getOneUser ({commit}, data) {
    console.log(data)
    const ref = firebase.database().ref('wild-wild-west/user/' + data)
    ref.on('value', (snap) => {
      commit('ambilDataSatuan', snap.val())
      // console.log('Get One', snap.val())
    })
  },
  getOneUser1 ({commit}, data) {
    console.log(data)
    const ref = firebase.database().ref('wild-wild-west/user/' + data)
    ref.on('value', (snap) => {
      commit('ambilDataSatuan1', snap.val())
      // console.log(snap.val())
    })
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
