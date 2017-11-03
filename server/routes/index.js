var express = require('express');
var cors = require('cors')
var fbCtrl = require('../controllers/fb')
var router = express.Router();

router.use(cors())

/* GET home page. */
router.post('/', fbCtrl.login);

module.exports = router;
