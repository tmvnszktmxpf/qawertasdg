
const express = require('express')
const app = express()
const port = 80
const template = require('./lib/template.js');
const compression = require('compression');
const conn = require('./lib/db');
const bodyParser = require('body-parser')
const pageRouter = require('./routes/page');
// const authorRouter = require('./routes/author');
const cookieParser = require('cookie-parser');
const login = require('./lib/login.js');
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const flash = require('connect-flash');





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

const passport = require('./lib/passport')(app);



const loginRouter = require('./routes/login')(passport);


app.use('/page', pageRouter);
app.use('/login', loginRouter);


app.get('/', (req, res) => {
  const title = 'Welcome';
  const description = 'Hello, Node.js';
  const list = template.list(req.list);
  const authStatusUI = login.authStatusUI(req, res);
  const html = template.html(title, list,
    `<h2>${title}</h2>${description}
    <img src= '/images/Depth1.jpg'>
    `
    , `<a href ="/page/create">create</a>`
    , authStatusUI
  );
  res.writeHead(202);
  res.end(html);
})

const http = require("http")
const https = require("https")
const fs = require("fs")

var privateKey = fs.readFileSync("/etc/letsencrypt/live/{hostname}/privkey.pem")
var certificate = fs.readFileSync("/etc/letsencrypt/live/{hostname}/cert.pem")
var ca = fs.readFileSync("/etc/letsencrypt/live/{hostname}/chain.pem")
const credentials = { key: privateKey, cert: certificate, ca: ca }




app.use((req, res) => {
  res.status(404).send('sorry');
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

http.createServer(app).listen(80)
https.createServer(credentials, app).listen(443)





