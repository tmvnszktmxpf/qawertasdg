
const mysql = require('mysql');
const trino = require('@dalongrong/trino-client');





const db = {
  conn: () => {
    const a = mysql.createConnection({
      host: '',
      user: '',
      password: '',
      database: ''
    });
    a.connect();
    return a;
  },
  conn2: () => {
    const a = mysql.createConnection({
      host: '',
      user: '',
      password: '',
      database: ''
    });
    return a;
  },
  conn_svc_dp: () => {
    const a = new trino.Client({
      host: '',
      port: ,
      catalog: '',
      schema: '',
      user: '',
    });
    return a;
  }
}

module.exports = db;
