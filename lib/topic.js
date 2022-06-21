const conn = require('./db');
const template = require('./template.js');
const login = require('./login.js');
const crypto = require("crypto");



exports.page = function (request, response, next) {
  conn.query(`
  select c.title,c.description,c.id,a.name
  from topic c left join  user a on c.author_id = a.id
  where 1=1
  and c.id=?
  `, [request.params.pageID], (err2, topic) => {
    if (err2) {
      next(err2);
    }
    else if (topic[0]) {
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
    } else {
      response.status(404).send('sorry');
    }
  });
};

exports.create = function (request, response) {
  if (login.authIsOwner(request, response) === false) {
    response.end('login required');
    return false;
  }
  const title = 'Create';
  const list = template.list(request.list);
  const html = template.html(title, list,
    `
    <form action="/page/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
    `
    , `<a href="/page/create">create</a>`
    , login.authStatusUI(request, response)
  );
  response.writeHead(200);
  response.end(html);
};

exports.create_process = function (request, response) {
  if (login.authIsOwner(request, response) === false) {
    response.end('login required');
    return false;
  }
  const post = request.body;
  const id = crypto.randomBytes(16).toString("hex");
  conn.query(`
    INSERT INTO topic (id,title, description, created, author_id) 
      VALUES(?, ?, ?, NOW(), ?)`,
    [id, post.title, post.description, request.user.id],
    function (error, result) {
      if (error) {
        throw error;
      }
      response.writeHead(302, { Location: `/page/${id}` });
      response.end();
    }
  )
};

exports.update = function (request, response) {
  if (login.authIsOwner(request, response) === false) {
    response.end('login required');
    return false;
  }
  conn.query(`select user.id from user, topic where user.id = topic.author_id and topic.id=?`, [request.params.pageID], (err, author) => {
    if (author[0].id !== request.user.id) {
      console.log('not yours');
      request.flash('error', 'no update auth');
      response.redirect(`/`);
    } else {
      conn.query(`select * from topic where id=?`, [request.params.pageID], (err2, topic) => {
        if (err2) {
          throw err2;
        }
        const title = topic[0].title;
        const description = topic[0].description;
        const list = template.list(request.list);
        const html = template.html(title, list,
          `
          <form action="/page/update_process" method ="post">
            <input type="hidden" name="id" value="${request.params.pageID}">
            <p><input type = "text" name="title" value=${title}></p>
            <p>
                <textarea name ="desc" >${description}</textarea>
            </p>
            <p>
                <input type="submit">
            </p>
          </form>
          `
          , ``
          , login.authStatusUI(request, response)
        );
        response.writeHead(202);
        response.end(html);
      });
    }
  })
};

exports.update_process = function (request, response) {
  if (login.authIsOwner(request, response) === false) {
    response.end('login required');
    return false;
  }
  const post = request.body;

  conn.query(`select user.id from user, topic where user.id = topic.author_id and topic.id=?`, [post.id], (err, author) => {
    if (author[0].id !== request.user.id) {
      console.log('not yours');
      request.flash('error', 'no update auth');
      response.redirect(`/`);
    } else {
      conn.query(`update topic set title = ?,description=? where id=?`, [post.title, post.desc, post.id], (err2, result) => {
        if (err2) {
          throw err2;
        }
        response.redirect(`/page/${post.id}`);
      })
    }
  })
};

exports.delete_process = function (request, response) {
  if (login.authIsOwner(request, response) === false) {
    response.end('login required');
    return false;
  }
  const post = request.body;

  conn.query(`select user.id from user, topic where user.id = topic.author_id and topic.id=?`, [post.id], (err, author) => {
    if (author[0].id !== request.user.id) {
      console.log('not yours');
      request.flash('error', 'no delete auth');
      response.redirect(`/`);
    } else {
      conn.query(`delete from topic  where id=?`, [post.id], (err2, result) => {
        if (err2) {
          throw err2;
        }
        response.redirect(`/`);
      })
    }
  })
};