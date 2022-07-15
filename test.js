
// const presto  = require('presto-client');

// const client = new presto.Client({
//     user: 'myname',
//     host: 'trino.datasvc.class101.net',
//     port: 80,
//     user: 'hoppe',
//     catalog:'hive',
//     schema:'svc_dp'
// });

// client.execute({
//   query:   'SELECT count(*) as cnt FROM tblname WHERE ...',
//   catalog: 'hive',
// //   schema:  'default',
//   source:  'nodejs-client',
//   state:   function(error, query_id, stats){ console.log({message:"status changed", id:query_id, stats:stats}); },
//   columns: function(error, data){ console.log({resultColumns: data}); },
//   data:    function(error, data, columns, stats){ console.log(data); },
//   success: function(error, stats){},
//   error:   function(error){}
// });


// console.log(client);



// const lento = require('lento');

// const client = lento({
//     hostname: 'trino.datasvc.class101.net',
//     port: 80,
//     catalog: 'hive',
//     schema: 'svc_dp',
//     user: 'airflow',
//     protocol: 'http:',
//     headers: 'X-Trino-Transaction-Id',
//     source: 'nodejs-client',
//     timezoen: 'UTC'
//   });

// console.log(client);


// client.query(`SELECT * FROM svc_dp.products_meta LIMIT 5`,(err,data)=>{
//     console.log(err);
//     console.log(data);
// })




// var presto = require('presto-client');
// var client = new presto.Client({
//     host: 'trino.datasvc.class101.net',
//     port: 80,
//     catalog: 'hive',
//     schema: 'svc_dp',
//     user: 'airflow',
//     protocol: 'http:',
//     headers: 'X-Trino-Transaction-Id',
//     source: 'nodejs-client',
//     timezoen: 'UTC'
// });


// client.execute({
//     query:   'SELECT * FROM svc_dp.products_meta LIMIT 5',
//     catalog: 'hive',
//     schema:  'svc_dp',
//     source:  'nodejs-client',
//     state:   function(error, query_id, stats){ console.log({message:"status changed", id:query_id, stats:stats}); },
//     columns: function(error, data){ console.log({resultColumns: data}); },
//     data:    function(error, data, columns, stats){ console.log(data); },
//     success: function(error, stats){},
//     error:   function(error){}
// })

// console.log(client.execute());

var trino = require('@dalongrong/trino-client');
var client = new trino.Client({
    host: 'trino.datasvc.class101.net',
    port: 80,
    catalog: 'hive',
    schema: 'svc_dp',
    user: 'airflow',
    protocol: 'http:',
    headers: 'X-Trino-Transaction-Id',
    source: 'nodejs-client',
    timezoen: 'UTC'
});

client.execute({
  query:   'SELECT * FROM svc_dp.products_meta LIMIT 5',
  catalog: 'hive',
  schema:  'default',
  source:  'nodejs-client',
  state:   function(error, query_id, stats){ console.log({message:"status changed", id:query_id, stats:stats}); },
  columns: function(error, data){ console.log({resultColumns: data}); },
  data:    function(error, data, columns, stats){ console.log(data); },
  success: function(error, stats){},
  error:   function(error){}
});

