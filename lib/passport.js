
module.exports = function (app) {
    var conn = require('./db');


    var passport = require('passport');
    var LocalStrategy = require('passport-local');
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, cb) {
        // console.log('serializeUser', user);
        cb(null, user.id);
    });

    passport.deserializeUser(function (id, cb) {
        conn.query(`select id,name,email,profile from user where id =?`, [id], (err, user) => {
            // console.log('desecializeUser', id, user);
            cb(null, user[0]);
        })
    });

    passport.use(new LocalStrategy(
        {
            usernameField: 'name',
            passwordField: 'password'
        },
        function verify(username, password, cb) {
            console.log('localstrategy', username, password);
            conn.query(`select id,name,profile,email from user where name=? and password=?`, [username, password], (err, user) => {
                if (user[0]) {
                    console.log("LOGIN SUSS");
                    return cb(null, user[0]);
                } else {
                    console.log("who are ayo?");
                    return cb(null, false, { message: "who are you?" });
                }
            })
        }));

    return passport;
}