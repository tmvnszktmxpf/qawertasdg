var conn = require('./db');
var template = require('./template.js');
const login = require('./login.js');



exports.page = function (request, response, next) {
  console.log(`
  
  
  
  
  sdfsdf
  
  
  
  
  
  `, topic);
  conn.query(`
  select c.title,c.description,c.id,a.name
  from topic c left join  user a on c.author_id = a.id
  where 1=1
  and c.id=?
  `, [request.params.pageID], (err2, topic) => {
    if (err2) {
      next(err2);
    }
    else {
      console.log(`
      
      
      
      
      sdf2
      
      
      
      
      
      `, topic);
      var title = topic[0].title;
      var description = topic[0].description;
      var list = template.list(request.list);
      var html = template.html(title, list,
        `<h2>${title}</h2>${description}
          <p>by ${topic[0].name}</p>
          `
        , `<a href ="/page/create">create</a>
            <a href = "/page/update/${request.params.pageID}">update</a>
            <form action="/page/delete_process" method = "post" >
              <input type="hidden" name = id value="${request.params.pageID}">
              <input type="submit" value="delete">
            </form>
          `
        , login.authStatusUI(request, response)
      );
      // response.writeHead(202);
      response.send(html);
    }
  });
};

exports.create = function (request, response) {
  if (login.authIsOwner(request, response) === false) {
    response.end('login required');
    return false;
  }
  conn.query('SELECT * FROM author', function (error2, authors) {
    var title = 'Create';
    var list = template.list(request.list);
    var html = template.html(title, list,
      `
      <form action="/page/create_process" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          ${template.authorSelect(authors)}
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
  });
};

exports.create_process = function (request, response) {
  if (login.authIsOwner(request, response) === false) {
    response.end('login required');
    return false;
  }
  var post = request.body;
  conn.query(`
    INSERT INTO topic (title, description, created, author_id) 
      VALUES(?, ?, NOW(), ?)`,
    [post.title, post.description, post.author],
    function (error, result) {
      if (error) {
        throw error;
      }
      response.writeHead(302, { Location: `/page/${result.insertId}` });
      response.end();
    }
  )
};

exports.update = function (request, response) {
  if (login.authIsOwner(request, response) === false) {
    response.end('login required');
    return false;
  }
  conn.query(`select * from topic where id=?`, [request.params.pageID], (err2, topic) => {
    if (err2) {
      throw err2;
    }
    conn.query(`select * from author`, (err2, authors) => {
      var title = topic[0].title;
      var description = topic[0].description;
      var list = template.list(request.list);
      var html = template.html(title, list,
        `
        <form action="/page/update_process" method ="post">
          <input type="hidden" name="id" value="${request.params.pageID}">
          <p><input type = "text" name="title" value=${title}></p>
          <p>
              <textarea name ="desc" >${description}</textarea>
          </p>
          <p>
            ${template.authorSelect(authors, topic[0].author_id)}
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
  });
};

exports.update_process = function (request, response) {
  if (login.authIsOwner(request, response) === false) {
    response.end('login required');
    return false;
  }
  var post = request.body;
  var id = post.id;
  var title = post.title;
  var author = post.author;
  var desc = post.desc;
  conn.query(`update topic set title=?,description=?,author_id=? where id=?`, [title, desc, author, id], (err2, result) => {
    if (err2) {
      throw err2;
    }
    response.redirect(`/page/${id}`)
  })
};

exports.delete_process = function (request, response) {
  if (login.authIsOwner(request, response) === false) {
    response.end('login required');
    return false;
  }
  var post = request.body;
  var id = post.id;
  conn.query('delete from topic where id=?', [id], (err, result) => {
    if (err) {
      throw err;
    }
    response.redirect('/');
  });
};