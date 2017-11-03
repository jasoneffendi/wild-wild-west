var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
var app = require('../app.js')
var jwt = require('jsonwebtoken')
var test = ''
chai.use(chaiHttp)

describe('post article route', function () {
    it('should return error, because no access token was defined', function (done) {
      chai.request(app)
      .post('/')
      .send({
          accessToken: ''
      })
      .end(function (err, response) {
        var opentoken = jwt.verify(response.body.token, 'wild')
        response.status.should.equal(200)
        opentoken.error.message.should.equal('An active access token must be used to query information about the current user.')
        opentoken.error.type.should.equal('OAuthException')
        opentoken.error.code.should.equal(2500)
        response.body.error.message.should.equal('An active access token must be used to query information about the current user.')
        response.body.error.type.should.equal('OAuthException')
        response.body.error.code.should.equal(2500)
        done()
      })
    })
  })