const FB = require('fb')
const jwt = require('jsonwebtoken')

class fbCtrl {
    static login(req,res) {
        FB.api('me', { fields: ['id', 'name','email', 'picture'], access_token: req.body.accessToken }, function (response) {
            // console.log(response)
            // console.log(response.picture.data.url)
            var token = jwt.sign(response, 'wild')
            response.token = token
            // console.log(token)
            res.send(response)
        })
    }
}

module.exports = fbCtrl