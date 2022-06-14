
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




app.use(cookieParser());
// // set a cookie
// app.use(function (req, res, next) {
//   // check if client sent cookie
//   var cookie = req.cookies;
//   if (cookie.cookieName === undefined) {
//     // no: set a new cookie
//     var randomNumber = Math.random().toString();
//     randomNumber = randomNumber.substring(2, randomNumber.length);
//     res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
//     console.log('cookie created successfully');
//   } else {
//     // yes, cookie was already present 
//     console.log('cookie exists', cookie);
//   }
//   next(); // <-- important!
// });

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


app.use('/page', pageRouter);
app.use('/author', authorRouter);
app.use('/login', loginRouter);


app.get('/', (req, res) => {
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


