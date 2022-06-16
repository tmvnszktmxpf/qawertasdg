
const express = require('express')
const app = express()
const port = 3000
var template = require('./lib/template.js');
var compression = require('compression');
var conn = require('./lib/db');
var bodyParser = require('body-parser')
var pageRouter = require('./routes/page');
var authorRouter = require('./routes/author');
var loginRouter = require('./routes/login');
const cookieParser = require('cookie-parser');
const login = require('./lib/login.js');
var session = require('express-session')
var FileStore = require('session-file-store')(session);
var flash = require('connect-flash');


var authData = {
  email: 'diable@naver.com',
  password: 'vkjhzkxchvkasdf',
  nickname: 'asdfasdf'
}


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', (req, res, next) => {
  conn.query(`select * from topic`, (err, topics) => {
    req.list = topics;
    next();
  });
});
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore({})
}))
app.use(flash());


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

app.post('/login/login_process', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));


app.use('/page', pageRouter);
app.use('/author', authorRouter);
app.use('/login', loginRouter);


app.get('/', (req, res) => {
  console.log(req.user);
  var title = 'Welcome';
  var description = 'Hello, Node.js';
  var list = template.list(req.list);
  var authStatusUI = login.authStatusUI(req, res);
  var html = template.html(title, list,
    `<h2>${title}</h2>${description}
    <img src= '/images/Depth1.jpg'>
    `
    , `<a href ="/page/create">create</a>`
    , authStatusUI
  );
  res.writeHead(202);
  res.end(html);
})




app.use((req, res) => {
  res.status(404).send('sorry');
});

// app.use((err, req, res, next)=>{
//   console.log(err.stack);
//   res.suatus(500).send('asdfl??');
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


