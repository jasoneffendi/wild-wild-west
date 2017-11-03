import Vue from 'vue'
import Vuex from 'vuex'
// hapus
import VueFire from 'vuefire'
import firebase from 'firebase'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})
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
  status: '',
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
  },
  selesai (state, payload) {
    console.log(payload)
    let barunya = payload.status
    state.status = barunya
  }

}

const actions = {
  // finish ({commit}, data) {
  //   // Vue.prototype.$db.ref('wild-wild-west/finish/').push({
  //   //   status: 'false'
  //   // })
  //   // .then((data) => {
  //   //   // commit('addPengguna', data)
  //   //   console.log('kembalian', data.key)
  //   // })
  //   Vue.prototype.$db.ref('wild-wild-west/dataSatuan/' + '-Ky-FGjLhDIz_ftXxEII').set({
  //     status: data
  //   })
  //   const ref = firebase.database().ref('wild-wild-west/dataSatuan/' + '-Ky-FGjLhDIz_ftXxEII')
  //   ref.on('value', (snap) => {
  //     // commit('ambilDataSatuan', snap.val())
  //     // console.log('berapa', snap.val().status)
  //     commit('mulai', snap.val())
  //   })
  //   // commit('mulai', data)
  // },
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
    console.log(data)
    if (data.point >= 50) {
      console.log('habis')
      let rubahpermainan = !state.status
      state.oknum = data.username
      console.log('oknum', state.oknum)

      Vue.prototype.$db.ref('wild-wild-west/dataSatuan/' + '-Ky02T5GQcJrHk_ReNdu').set({
        status: rubahpermainan
      })

      const ref = firebase.database().ref('wild-wild-west/dataSatuan/' + '-Ky-FGjLhDIz_ftXxEII')
      ref.on('value', (snap) => {
        // commit('ambilDataSatuan', snap.val())
        // console.log('berapa', snap.val().status)
        commit('selesai', snap.val())
      })
    } else {
      Vue.prototype.$db.ref('wild-wild-west/user/' + data.id).set({
        username: data.username,
        point: data.point += 50,
        profilepicture: data.profilPicture
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
  },
  getTokenUser ({commit}, data) {
    console.log('halo', data)
    http.post('/', {
      obj: {
        username: data.name,
        id: data.id,
        picture: data.picture.data.url,
        email: data.email
      }
      // accessToken: data.fbToken
    }).then(({data}) => {
      var decoded = jwtDecode(data)
      // console.log('decode', decoded)

      Vue.prototype.$db.ref('wild-wild-west/user/' + '-Kxxs-4W5DWdBt_iZoDr').set({
        username: decoded.username,
        point: 0,
        profilepicture: decoded.picture
      })
      // console.log('masuk', data)
    })
    Vue.prototype.$db.ref('wild-wild-west/dataSatuan/' + '-Ky02T5GQcJrHk_ReNdu').set({
      status: false
    })
  },
  getTokenUserTwo ({commit}, data) {
    console.log('halo', data)
    http.post('/', {
      obj: {
        username: data.name,
        id: data.id,
        picture: data.picture.data.url,
        email: data.email
      }
      // accessToken: data.fbToken
    }).then(({data}) => {
      var decoded = jwtDecode(data)
      // console.log('decode', decoded)

      Vue.prototype.$db.ref('wild-wild-west/user/' + '-Kxxs-onVj6eUMQPcMqF').set({
        username: decoded.username,
        point: 0,
        profilepicture: decoded.picture
      })
      // console.log('masuk', data)
    })
    Vue.prototype.$db.ref('wild-wild-west/dataSatuan/' + '-Ky02T5GQcJrHk_ReNdu').set({
      status: false
    })
  },
  getTokenUserDelete ({commit}, data) {
    Vue.prototype.$db.ref('wild-wild-west/user/' + '-Kxxs-4W5DWdBt_iZoDr').set({
      username: 'player1',
      point: 0,
      profilepicture: 'https://usatcowboyswire.files.wordpress.com/2016/02/cowboysnavicon.png'
    })
    Vue.prototype.$db.ref('wild-wild-west/dataSatuan/' + '-Ky02T5GQcJrHk_ReNdu').set({
      status: false
    })
  },
  getTokenUserDeleteTwo ({commit}, data) {
    Vue.prototype.$db.ref('wild-wild-west/user/' + '-Kxxs-onVj6eUMQPcMqF').set({
      username: 'player2',
      point: 0,
      profilepicture: 'https://usatcowboyswire.files.wordpress.com/2016/02/cowboysnavicon.png'
    })
    Vue.prototype.$db.ref('wild-wild-west/dataSatuan/' + '-Ky02T5GQcJrHk_ReNdu').set({
      status: false
    })
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
