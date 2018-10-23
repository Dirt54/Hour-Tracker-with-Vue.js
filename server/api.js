
var users = require('./controllers/users.ctr');
var hours = require('./controllers/hours.ctr');

var express = require('express');



var router = express.Router();

router.use('/users', users);
router.use('/labs', hours);




module.exports = router;