var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
var app = require('../app.js')
var test = ''
chai.use(chaiHttp)

describe('post article route', function () {
    it('should return error, because no access token was defined', function (done) {
      chai.request(app)
      .post('/')
      .end(function (err, response) {
        console.log(response.body)
        response.status.should.equal(200)
        response.body.error.message.should.equal('An active access token must be used to query information about the current user.')
        response.body.error.type.should.equal('OAuthException')
        response.body.error.code.should.equal(2500)
        done()
      })
    })
  })