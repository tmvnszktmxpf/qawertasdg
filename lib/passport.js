
module.exports = function (app) {

    var authData = {
        email: 'diable@naver.com',
        password: 'vkjhzkxchvkasdf',
        nickname: 'asdfasdf'
    }

    var passport = require('passport');
    var LocalStrategy = require('passport-local');
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, cb) {
        console.log('serializeUser', user);
        cb(null, user.email);
    });

    passport.deserializeUser(function (user, cb) {
        console.log('desecializeUser', user);
        cb(null, authData);
    });

    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function verify(username, password, cb) {
            console.log('localstrategy', username, password);
            if (username === authData.email) {
                if (password === authData.password) {
                    console.log("LOGIN SUSS");
                    return cb(null, authData);
                } else {
                    console.log("incorrect paswsord");
                    return cb(null, false, { message: "incorrect password" });
                }
            } else {
                console.log("who are ayo?");
                return cb(null, false, { message: "who are you?" });
            };
        }));

    return passport;
}