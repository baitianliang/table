const express = require('express');
const router = express.Router();
const getLoginRouter = require('./login');
getLoginRouter(router)
const getUserRouter = require('./user');
getUserRouter(router)

module.exports = router;