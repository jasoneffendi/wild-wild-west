import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

// const http = axios.create({
//   baseURL: 'http://localhost:3000'
// })

Vue.use(Vuex)

const state = {
  pemain: ''
}

const mutations = {
  addPengguna (state, payload) {
    state.pemain = payload
  }
}

const actions = {
  addUser ({commit}) {
    commit('addPengguna', null)
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
