const FB = require('fb')

class fbCtrl {
    static login(req,res) {
        FB.api('me', { fields: ['id', 'name','email', 'picture'], access_token: '' }, function (response) {
            console.log(response)
            console.log(response.picture.data.url)
            res.send(response)
        })
    }
}

module.exports = fbCtrl