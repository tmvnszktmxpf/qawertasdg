
var trino = require('@dalongrong/trino-client');
var client = new trino.Client({
    host: 'trino.datasvc.class101.net',
    port: 80,
    catalog: 'hive',
    schema: 'svc_dp',
    user: 'airflow',
});

client.execute({
  query:   'SELECT * FROM svc_dp.products_meta LIMIT 1',
  data:    function(error, data, columns, stats){ 
    console.log(data[0][10]);
    // console.log(columns);
    },
  success: function(error, stats){},
  error:   function(error){}
});

