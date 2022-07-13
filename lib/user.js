const conn = require('./db');
const template = require('./template.js');
const login = require('./login.js');




exports.page = function (request, response, next) {
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
            <p>by ${topic[0].name}</p>
            `
          , `<a href ="/page/create">create</a>
              <a href = "/page/update/${request.params.pageID}">update</a>
              <form action="/page/delete_process" method = "post" >
                <input type="hidden" name = "id" value="${request.params.pageID}">
                <input type="submit" value="delete">
              </form>
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
  