const conn = require('./db');
const template = require('./template.js');
const login = require('./login.js');




exports.user = function (request, response, next) {
    response.send('zxcv')
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
  