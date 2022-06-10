
var mysql = require('mysql');
var conn = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: 'opentutorials'
});
conn.connect();

module.exports = conn;