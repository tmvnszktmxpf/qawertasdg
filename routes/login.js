const express = require('express')
const router = express.Router();
const login = require('../lib/login');



module.exports = function (passport) {
    router.get('/', (req, res) => {
        login.login(req, res);
    })

    router.get('/logout_process', (req, res) => {
        login.logout_process(req, res);
    })

    router.get('/register', (req, res) => {
        login.register(req, res);
    })

    router.post('/register_process', (req, res) => {
        login.register_process(req, res);
    });

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

