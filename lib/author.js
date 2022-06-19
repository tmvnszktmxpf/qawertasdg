const conn = require('./db');
const template = require('./template.js');
const login = require('./login.js');

exports.home = function (request, response) {
  conn.query('select * from author', (err2, authors) => {
    if (err2) {
      throw err2;
    }
    const title = 'Author List';
    const list = template.list(request.list);
    const html = template.html(title, list,
      `
      ${template.authorTable(authors)}
      <form action = "/author/create_process" method = "post">
          <p>
              <input type = "text" name = "name" placeholder = "name">
          </p>
          <p>
              <textarea name="profile"></textarea>
          </p>
          <p>
              <input type = "submit" value="create">
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



exports.create_process = function (request, response) {
  if (login.authIsOwner(request, response) === false) {
    response.end('login required');
    return false;
  }
  console.log('zxcvzxcv');
  const post = request.body;
  conn.query(`
    INSERT INTO author (name, profile) 
      VALUES(?, ?)`,
    [post.name, post.profile],
    function (error, result) {
      response.writeHead(302, { Location: `/author` });
      response.end();
    })
}



exports.update = function (request, response) {
  if (login.authIsOwner(request, response) === false) {
    response.end('login required');
    return false;
  }
  conn.query('select * from author', (err2, authors) => {
    conn.query(`select * from author where id =?`, [request.params.authorID], (err3, author) => {
      const title = 'Author List';
      const list = template.list(request.list);
      const html = template.html(title, list,
        `
          ${template.authorTable(authors)}
          <form action = "/author/update_process" method = "post">
              <p>
                  <input type="hidden" name = "id" value ="${request.params.authorID}">
              </p>
              <p>
                  <input type = "text" name = "name" value="${author[0].name}" placeholder = "name">
              </p>
              <p>
                  <textarea name="profile">${author[0].profile}</textarea>
              </p>
              <p>
                  <input type = "submit" value = "update">
              </p>
          </form>
          `
        , ``
        , login.authStatusUI(request, response)
      );
      response.writeHead(202);
      response.end(html);
    });
  });
}


exports.update_process = function (request, response) {
  if (login.authIsOwner(request, response) === false) {
    response.end('login required');
    return false;
  }
  const post = request.body;
  conn.query(`
    update author set name = ?, profile = ? where id = ?`,
    [post.name, post.profile, post.id],
    function (error, result) {
      if (error) {
        throw error;
      }
      response.writeHead(302, { Location: `/author` });
      response.end();
    });
}


exports.delete_process = function (request, response) {
  if (login.authIsOwner(request, response) === false) {
    response.end('login required');
    return false;
  }
  const post = request.body;
  const id = post.id;
  conn.query('delete from author where id=?', [id], (err, result) => {
    if (err) {
      throw err;
    }
    response.redirect('/author');
  });
}