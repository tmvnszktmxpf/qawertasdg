const express = require('express')
const router = express.Router();
const user = require('../lib/user');





router.get('/', (req, res, next) => {
    console.log('routeuser');
    user.user(req, res, next);
})

module.exports = router;