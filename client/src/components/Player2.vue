<template lang="html">
  <div class="panel panel-default">
  <div class="panel-body">
    {{ profilName }}
  </div>
  <div class="panel-footer">
    <!-- <img src="https://usatcowboyswire.files.wordpress.com/2016/02/cowboysnavicon.png"
    alt="" style="width: 150px"> -->
    <img v-bind:src="profilPicture" alt="" style="width: 100px">
    <button @click="login" type="button" class="btn btn-primary">Login</button>
    <button type="button" class="btn btn-primary">Shoot</button>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      profilName: '',
      profilPicture: ''
    }
  },
  methods: {
    login () {
      var self = this
      // console.log('asdfasdfa')
      window.FB.getLoginStatus(function (response) {
        statusChangeCallback(response)
      })
      function statusChangeCallback (response) {
        if (response.status === 'connected') {
          window.FB.logout()
          self.profilPicture = ''
          self.profilName = ''
        } else {
          window.FB.login(function (response) {
            if (response.authResponse) {
              //  console.log('Welcome!  Fetching your information.... ');
              window.FB.api('/me', {fields: ['id', 'name', 'email', 'picture.type(large)']}, function (response) {
                // console.log('Good to see you, ' + response.name + '.')
                console.log(response)
                self.profilName = response.name
                self.profilPicture = response.picture.data.url
                console.log(self.profilPicture)
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
</style>
