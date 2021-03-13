var express = require('express');
var router = express.Router();

/* GET users listing. */
const { userSubscribe } = require("../controller/user")

router.get('/subs', userSubscribe)

module.exports = router;
