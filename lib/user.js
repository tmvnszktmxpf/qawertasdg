const db = require('./db');
const conn = db.conn();
const template = require('./template.js');
const login = require('./login.js');


const path = require("path");

const fs = require("fs");
const filePath = path.join(__dirname, "item_ids.csv_output.csv");


exports.user = function (req, res, next) {
    console.log('libuser');
    const data = fs.readFileSync(filePath,{encoding:"utf8"});
    const rows = data.split("\n");
    const post = req.body;
    console.log(post.userid);


    const conn_svc_dp = db.conn_svc_dp();
    console.log(conn_svc_dp);
    conn_svc_dp.execute({
      query: `
        SELECT *
        FROM svc_dp.personalize_result 
        WHERE 1=1
        AND dataset = 'klass-recsys-stg-3'
        AND solution = 'klass-recsys-stg-3-solution-1-campaigns'
        AND user_id = 
      `+`post.userid`,
      data: function(error, data, columns, stats){ 
        console.log(data); 
        res.send('sdfsdfsdfsdsdds');
      },
      success: function(error, stats){},
      error:   function(error){}
    })

    

    // rows.forEach(row=>{
    //     const separators = [' ', ',','"','[',']'];
    //     let sp = row.split(/["' ,\[\]]/);
    //     sp = sp.filter(word=>word.length>2);
    //     if (sp[0] === post.userid) {
    //       conn.query(`
    //           SELECT 
    //           firestoreid 
    //           ,title 
    //           ,coverimageurl 
    //         FROM products
    //         where firestoreid in (?)
    //       `,[sp],(err,products)=>{
    //         if (err) {
    //           next(err);
    //         } else {
    //           // console.log(data);
    //           const title = products[0];
    //           const html = template.html(title, '',
    //             `<h2>${title}</h2>
    //             ${template.productlist(products)}
    //               `
    //             , ``
    //             , login.authStatusUI(req, res)
    //           );
    //           // response.writeHead(202);
    //           res.send(html);
    //         }
    //       });
    //     }
    // });





    // const title = topic[0].title;
    // const description = topic[0].description;
    // const list = template.list(request.list);
    // const html = template.html(title, list,
    //     `<h2>${title}</h2>${description}
    //     <p>by zxcvzxcvzxcvzxbb</p>
    //     `
    //     , `asdfasdfsadfsadf
    //     `
    //     , login.authStatusUI(request, response)
    // );
    // // response.writeHead(202);
    // response.send(html);
  };
  