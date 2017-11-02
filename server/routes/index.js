var express = require('express');
var fbCtrl = require('../controllers/fb')
var router = express.Router();

/* GET home page. */
router.post('/', fbCtrl.login);

module.exports = router;
