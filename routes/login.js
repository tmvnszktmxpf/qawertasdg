const express = require('express')
const router = express.Router();
var login = require('../lib/login');




router.get('/', (req, res) => {
    login.login(req, res);
})

router.get('/logout_process', (req, res) => {
    login.logout_process(req, res);
})


router.post('/login_process', (req, res) => {
    login.login_process(req, res);
})

module.exports = router;