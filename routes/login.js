const express = require('express')
const router = express.Router();
var login = require('../lib/login');



module.exports = function (passport) {
    router.get('/', (req, res) => {
        login.login(req, res);
    })

    router.get('/logout_process', (req, res) => {
        login.logout_process(req, res);
    })

    router.post('/login_process', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    router.post('/login_process', (req, res) => {
        login.login_process(req, res);
    })

    return router;
}

