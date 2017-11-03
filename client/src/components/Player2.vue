<template lang="html">
  <div class="panel panel-default">
  <div class="panel-body">
    {{ datasatuansatu.username }}
  </div>
  <div class="panel-footer">
    <div align="center">
      <img v-bind:src="datasatuansatu.profilepicture" alt="" style="width: 100px; height:115px; padding: 5px">
      <div class="">
        <button @click="login" type="button" class="btn btn-primary">{{ buttonText }}</button><br><br>
        <div class="" v-if="trigerStart == true">
          <button class="btn btn-primary" v-on:click="update(kunci, datasatuansatu.username, datasatuansatu.point, datasatuansatu.status, datasatuansatu.profilepicture)" type="button" name="button">Fire</button>
        </div>
        <div class="" v-else>

        </div>

        <h1 style="text-align:center;color:#ffffff">{{datasatuansatu.point}}</h1>
        <h2>{{status}} - {{oknum}}</h2>
      </div>
    </div>
  </div>
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
      kunci: '-Kxxs-onVj6eUMQPcMqF',
      fbtoken: []
    }
  },
  methods: {
    tester () {
      this.addUser()
      // console.log('tekanan diterima')
      this.mulai('Kanan')
      this.update(this.kunci, 'username', 'tester')
    },
    update (id, username, point, status, picture) {
      let nilaibaru = !this.trigerStart
      // console.log('nilaibaru', nilaibaru)
      this.mulai(nilaibaru)
      // alert(this.oknum)
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
      'getOneUser1',
      'getTokenUserTwo',
      'getTokenUserDeleteTwo'
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
        self.getTokenUserDeleteTwo()
      } else {
        window.FB.login(function (response) {
          if (response.authResponse) {
            //  console.log('Welcome!  Fetching your information.... ');
            window.FB.api('/me', {fields: ['id', 'name', 'email', 'picture.type(large)']}, function (response) {
              // console.log('Good to see you, ' + response.name + '.')
              console.log(response)
              self.fbtoken = response
              console.log('test', self.fbtoken)
              self.getTokenUserTwo(self.fbtoken)
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
      'datasatuansatu',
      'status',
      'oknum'
    ])
  },
  created () {
    this.getOneUser1(this.kunci)
    // console.log(this.semuatodo)
    this.getUser()
  }
}
</script>

<style lang="css">
</style>
