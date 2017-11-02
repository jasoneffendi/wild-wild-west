<template>
  <div class="hello">
    <button v-on:click="tester()" type="button" name="button">Tekanan</button>
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
    tester () {
      this.addUser()
      console.log('tekanan diterima')
    },
    ...mapActions([
      'addUser'
    ])
  },
  computed: {
    ...mapState([
      'pemain'
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
