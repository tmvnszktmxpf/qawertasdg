
module.exports = function (app) {
    const conn = require('./db');
    const bcrypt = require('bcrypt');


    const passport = require('passport');
    const LocalStrategy = require('passport-local');
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
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
            conn.query(`select id,name,profile,email,password from user where name=? `, [username], (err, user) => {
                console.log(username, password, user);
                if (user[0]) {
                    bcrypt.compare(password, user[0].password, function (err, result) {
                        if (result) {
                            const uu = {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                profile: user.profile
                            }
                            console.log("LOGIN SUSS");
                            return cb(null, user[0]);
                        } else {
                            console.log("who are ayo?");
                            return cb(null, false, { message: "who are you?" });
                        }
                    });
                } else {
                    console.log('없는 유저');
                    return cb(null, false, '없는 유저');
                }
                // if (user[0]) {
                //     console.log("LOGIN SUSS");
                //     return cb(null, user[0]);
                // } else {
                //     console.log("who are ayo?");
                //     return cb(null, false, { message: "who are you?" });
                // }
            })
        }));

    const googleCredentials = require('../config/google.json');
    console.log(googleCredentials);
    passport.use(new GoogleStrategy({
        clientID: googleCredentials.web.client_id,
        clientSecret: googleCredentials.web.clientSecret,
        callbackURL: googleCredentials.web.callbackURL,
        passReqToCallback: true
    },
        function (request, accessToken, refreshToken, profile, done) {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    ));


    return passport;
}