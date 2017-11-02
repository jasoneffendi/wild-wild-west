const FB = require('fb')

class fbCtrl {
    static login(req,res) {
        FB.api('me', { fields: ['id', 'name','email'], access_token: '' }, function (response) {
            console.log(response)
            res.send(response)
        })
    }
}

module.exports = fbCtrl