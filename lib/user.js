const conn = require('./db');
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

    rows.forEach(row=>{
        const separators = [' ', ',','"','[',']'];
        let sp = row.split(/["' ,\[\]]/);
        sp = sp.filter(word=>word.length>2);
        if (sp[0] === post.userid) {
          conn.query(`
            select *
            from products
            where firestoreid in (?)
          `,[sp],(err,data)=>{
            if (err) {
              next(err);
            } else (
              console.log(data);
              // const title = data[0];
              // const html = template.html(title, '',
              //   `<h2>${title}</h2>
              //   ${template.productlist(products)}
              //     `
              //   , ``
              //   , login.authStatusUI(request, response)
              // );
              // // response.writeHead(202);
              // response.send(html);
            )
          });
        }
    });
    res.send('zxcv');
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
  