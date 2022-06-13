var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')

var FileStore = require('session-file-store')(session);

var app = express()

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore({})
}))

app.use(function (req, res, next) {
    if (!req.session.views) {
        req.session.views = {}
    }

    // get the url pathname
    var pathname = parseurl(req).pathname

    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

    next()
})

app.get('/', (req, res) => {
    console.log(req.session);
})

app.get('/foo', function (req, res) {
    res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function (req, res) {
    res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

app.listen(3000)