
const express = require('express')
const app = express()
const port = 3000
var topic = require('./lib/topic');
var author = require('./lib/author');
var compression = require('compression');
var conn = require('./lib/db');
var bodyParser = require('body-parser')
var pageRouter = require('./routes/page');
var authorRouter = require('./routes/author');
const cookieParser = require('cookie-parser');




app.use(cookieParser());


// set a cookie
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  }
  next(); // <-- important!
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', (req, res, next) => {
  conn.query(`select * from topic`, (err, topics) => {
    req.list = topics;
    next();
  });
});

app.use('/page', pageRouter);
app.use('/author', authorRouter);


app.get('/', (req, res) => {
  console.log('zxc22v');
  topic.home(req, res);
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


