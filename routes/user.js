const express = require('express')
const router = express.Router();
const user = require('../lib/user');





router.get('/:pageID', (req, res, next) => {
    user.user(req, res, next);
})

module.exports = router;