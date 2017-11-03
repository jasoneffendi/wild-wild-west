<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-md-4">

      </div>
      <div class="col-md-4">
        <refree></refree>
      </div>
      <div class="col-md-4">

      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <player1></player1>
      </div>
      <div class="col-md-4">

      </div>
      <div class="col-md-4">
        <player2></player2>
      </div>
    </div>
  </div>
</template>

<script>
import Refree from '@/components/Refree'
import Player1 from '@/components/Player1'
import Player2 from '@/components/Player2'
export default {
  name: 'Home',
  components: {
    Refree,
    Player1,
    Player2
  },
  data () {
    return {
      refree: '',
      player1: '',
      player2: '',
      profilPicture: '',
      profilName: ''
    }
  },
  methods: {
    login () {
      // console.log('asdfasdfa')
      window.FB.getLoginStatus(function (response) {
        statusChangeCallback(response)
      })
      function statusChangeCallback (response) {
        if (response.status === 'connected') {
          window.FB.logout()
          this.profilPicture = ''
          this.profilName = ''
        } else {
          window.FB.login(function (response) {
            if (response.authResponse) {
              // window.FB.api('me', {fields: ['id', 'name', 'email', 'picture.type(large)'], access_token:body.accessToken},
              // function (response) {
              //
              // }
              //  console.log('Welcome!  Fetching your information.... ');
              window.FB.api('/me', function (response) {
                console.log('Good to see you, ' + response.name + '.')
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
      }
    }
  },
  mounted: function () {
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
  }
}
</script>

<style lang="css">
.container {
  width: 90%;
}
</style>
