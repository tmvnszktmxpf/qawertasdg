
module.exports = function (app) {
    const conn = require('./db');
    const crypto = require("crypto");
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
            })
        }));

    const googleCredentials = require('../config/google.json');
    console.log(googleCredentials);
    passport.use(new GoogleStrategy({
        clientID: googleCredentials.web.client_id,
        clientSecret: googleCredentials.web.client_secret,
        callbackURL: googleCredentials.web.redirect_uris[0],
        passReqToCallback: true
    },
        function (request, accessToken, refreshToken, profile, cb) {
            console.log('GoogleStrategy', accessToken, refreshToken, profile);
            const email = profile.emails[0].value;
            conn.query(`select 
                            id
                            ,name
                            ,password
                            ,email
                        from user
                        where email =?`, [email],
                (err, user) => {
                    if (user) {
                        const uu = {
                            id: user[0].id,
                            email: user[0].email,
                            name: user[0].name,
                            googleId: profile.id
                        }
                        request.login(uu, (err2) => {
                            response.writeHead(302, { Location: `/` });
                            response.end();
                        })
                    } else {
                        bcrypt.hash('global password ^Y*&TGY*UIYGUIasdf235sdasd', 10, function (err3, hash) {
                            const id = crypto.randomBytes(16).toString("hex");
                            const uu = {
                                id: id,
                                email: email,
                                name: profile.name,
                                googleId: profile.id
                            };
                            conn.query(`
                            INSERT INTO user (id,name, password,email) 
                                VALUES(?, ?,?,?)`,
                                [id, uu.name, hash, uu.email],
                                function (error, result, uu) {
                                    request.login(uu, (err) => {
                                        response.writeHead(302, { Location: `/` });
                                        response.end();
                                    })
                                })
                        });
                    }
                });
            // User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //     return done(err, user);
            // });
        }
    ));

    app.get('/login/google',
        passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
        ));

    app.get('/login/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            console.log('zxcvzxcv');
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    return passport;
}