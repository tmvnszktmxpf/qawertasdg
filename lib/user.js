const conn = require('./db');
const template = require('./template.js');
const login = require('./login.js');




exports.user = function (request, response, next) {
    // conn.query(`
    // select c.title,c.description,c.id,a.name
    // from topic c left join  user a on c.author_id = a.id
    // where 1=1
    // and c.id=?
    // `, [request.params.pageID], (err2, topic) => {
    //   if (err2) {
    //     next(err2);
    //   }
    //   else if (topic[0]) {
        const title = topic[0].title;
        const description = topic[0].description;
        const list = template.list(request.list);
        const html = template.html(title, list,
          `<h2>${title}</h2>${description}
            <p>by zxcvzxcvzxcvzxbb</p>
            `
          , `asdfasdfsadfsadf
            `
          , login.authStatusUI(request, response)
        );
        // response.writeHead(202);
        response.send(html);
    //   } else {
    //     response.status(404).send('sorry');
    //   }
    // });
  };
  