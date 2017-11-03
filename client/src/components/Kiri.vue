<template>
  <div class="hello">
    <div class="" v-if="status == true">

    </div>
    <div class="" v-else>

      <div class="" v-if="trigerStart == true">
        <button v-on:click="tester()" type="button" name="button">Tekanan</button>
      </div>
      <div class="" v-else>

      </div>

      <!-- <div class="" v-for="(data, key) in datanya">
      <p>
      {{data}} - {{ key }}
    </p>
    <button v-on:click="update(kunci, data.username, data.point)" type="button" name="button">Ganti</button>
    <button v-on:click="anjing(key)" type="button" name="button">Hapus</button>
  </div> -->

  <div class="">
    <p>{{datasatuan}}</p>
    <button v-on:click="update(kunci, datasatuan.username, datasatuan.point)" type="button" name="button">Ganti</button>
  </div>

  <!-- <p>{{datasatuan}}</p> -->

    </div>
    {{status}} - {{oknum}}
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      kunci: '-Kxxs-4W5DWdBt_iZoDr'
    }
  },
  // firebase: function () {
  //   return {
  //     semuatodo: this.$db.ref('wild-wild-west/user/')
  //   }
  // },
  methods: {
    tester () {
      this.addUser()
      // console.log('tekanan diterima')
      this.mulai('Kiri')
    },
    update (id, username, point) {
      let obj = {
        id: id,
        username: username,
        point: point
      }
      // console.log(obj)
      this.upUser(obj)
    },
    anjing (data) {
      let obj = {
        id: data
      }
      this.deleteUser(obj)
    },
    ...mapActions([
      'addUser',
      'getUser',
      'upUser',
      'deleteUser',
      'mulai',
      'getOneUser'
    ])
  },
  computed: {
    ...mapState([
      'datanya',
      'pemain',
      'trigerStart',
      'count',
      'datasatuan',
      'status',
      'oknum'
    ])
  },
  created () {
    this.getOneUser(this.kunci)
    // console.log(this.semuatodo)
    this.getUser()
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
