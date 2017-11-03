<template>
  <div class="hello">
    <button v-on:click="tampakan()" type="button" name="button">Tekanan</button>
    <h3>{{trigerStart}}</h3>
    <h2>{{count}}</h2>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods: {
    tampakan () {
      let nilaibaru = !this.trigerStart
      // console.log('nilaibaru', nilaibaru)
      this.mulai(nilaibaru)
    },
    ...mapActions([
      'mulai'
    ])
  },
  computed: {
    ...mapState([
      'trigerStart',
      'count'
    ])
  },
  created () {
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
