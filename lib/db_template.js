
const mysql = require('mysql');
const conn = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: 'opentutorials'
});
conn.connect();

module.exports = conn;