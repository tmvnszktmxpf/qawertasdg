
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


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*',(req, res, next)=>{
  conn.query(`select * from topic`,(err,topics)=>{
    req.list = topics;
    next();
  });
});

app.use('/page',pageRouter);
app.use('/author',authorRouter);


app.get('/', (req, res) => {
  console.log('zxc22v');
  topic.home(req, res);
})




app.use((req,res)=>{
  res.status(404).send('sorry');
});

// app.use((err, req, res, next)=>{
//   console.log(err.stack);
//   res.suatus(500).send('asdfl??');
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


