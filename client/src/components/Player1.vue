<template lang="html">
  <div class="panel panel-default">
  <div class="panel-body">
    {{ datasatuan.username }}
  </div>
  <div class="panel-footer">
    <div align="center">
      <img v-bind:src="datasatuan.profilepicture" alt="" style="width: 100px; height:115px; padding: 5px">
      <div class="">
        <button @click="login" type="button" class="btn btn-primary">{{ buttonText }}</button>
      </div>
    </div>

    <div class="" v-if="status == true">

    </div>
    <div class="" v-else>

      <div class="" v-if="trigerStart == true">
        <button v-on:click="update(kunci, datasatuan.username, datasatuan.point, datasatuan.status, datasatuan.profilepicture)" type="button" name="button">Tekanan</button>
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

  <h1 style="text-align:center;color:#ffffff">{{datasatuan.point}}</h1>
  <!-- <div class="">
    <button v-on:click="update(kunci, datasatuan.username, datasatuan.point, datasatuan.status, datasatuan.profilepicture)" type="button" name="button">Ganti</button>
  </div> -->

  <!-- <p>{{datasatuan}}</p> -->
  <!-- {{status}} - {{oknum}} -->

    </div>


  </div>
  {{status}} - {{oknum}}
</div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  data () {
    return {
      profilName: '',
      profilPicture: '',
      buttonText: 'Login',
      kunci: '-Kxxs-4W5DWdBt_iZoDr',
      fbtoken: []
    }
  },
  methods: {
    kirim () {
      this.getTokenUser(this.fbtoken)
    },
    tester () {
      this.addUser()
      // console.log('tekanan diterima')
      this.mulai('Kiri')
    },
    update (id, username, point, status, picture) {
      let nilaibaru = !this.trigerStart
      // console.log('nilaibaru', nilaibaru)
      this.mulai(nilaibaru)
      console.log('aloha', picture)
      let obj = {
        id: id,
        username: username,
        point: point,
        status: status,
        profilPicture: picture
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
      'getOneUser',
      'getTokenUser',
      'getTokenUserDelete'
    ]),
    setDefault () {
      this.profilName = 'Player1'
      this.profilPicture = 'https://usatcowboyswire.files.wordpress.com/2016/02/cowboysnavicon.png'
    },
    statusChangeCallback (response) {
      var self = this
      if (response.status === 'connected') {
        window.FB.logout()
        self.setDefault()
        self.buttonText = 'Login'
        self.getTokenUserDelete()
      } else {
        window.FB.login(function (response) {
          if (response.authResponse) {
            //  console.log('Welcome!  Fetching your information.... ');
            window.FB.api('/me', {fields: ['id', 'name', 'email', 'picture.type(large)']}, function (response) {
              // console.log('Good to see you, ' + response.name + '.')
              // console.log(response)
              self.fbtoken = response
              console.log('test', self.fbtoken)
              self.getTokenUser(self.fbtoken)
              self.profilName = response.name
              self.profilPicture = response.picture.data.url
              self.buttonText = 'Logout'
              // window.FB.logout()
            })
            // this.$http.post('http://localhost:3000/api/login', {
            //   accessToken: response.authResponse.accessToken
            // })
            // .then(response => {
            //   //
            // })
          } else {
            console.log('User cancelled login or did not fully authorize.')
          }
        })
      }
    },
    login () {
      var self = this
      // console.log('asdfasdfa')
      window.FB.getLoginStatus(function (response) {
        self.statusChangeCallback(response)
      })
    }
  },
  mounted: function () {
    if (this.profilName === '') {
      this.setDefault()
    } else {
      this.buttonText = 'Logout'
    }
    // Load the SDK asynchronously
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 178711819350175,
        cookie: true, // enable cookies to allow the server to access
        xfbml: true,  // parse social plugins on this page the session
        version: 'v2.8' // use graph api version 2.8
      })
    }
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
  }
}
</script>

<style lang="css">
</style>
