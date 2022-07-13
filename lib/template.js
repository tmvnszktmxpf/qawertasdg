
const template = {
  html: function (title, list, body, control, authStatusUI = `<a href="/login">login</a> | <a href="/login/register">register</a>`) {
    return `
      <!doctype html>
      <html>
      <head>
        <title>WEB3234 - ${title}</title>
        <meta charset="utf-8">
        <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
        <link rel="stylesheet" type="text/css" href="https://tag101.shop/styles/style.css"></link>
        <script src="https://tag101.shop/js/hello.js""></script>
      </head>
      <body>
        ${authStatusUI}
        <h1><a href="/">WEB</a></h1>
        <form action="/user" method="post">
          <p><input type="text" name="userid" placeholder="userid"></p>
          <p>
            <input type="submit">
          </p>
        </form>
        ${body}
      </body>
      </html>
      `;
  },
  list: function (topics) {
    var list = '<ul>';
    topics.forEach(topic => {
      list = list + `<li><a href="/page/${topic.id}">${topic.title}</a></li>`;
    });
    var list = list + '</ul>';
    return list;
  },
  authorSelect: function (authors, author_id) {
    var tag = ``;
    authors.forEach(element => {
      var selected = ``;
      if (element.id === author_id) {
        selected = ' selected';
      }
      tag = tag + `<option value="${element.id}"${selected}>${element.name}</option>`;
    });
    return `<select name = "author">${tag}</select>`;
  },
  authorTable: function (authors) {
    var tag = '<table>';
    authors.forEach(author => {
      tag += '<tr>';
      tag += `
            <td>${author.name}</td>
            <td>${author.profile}</td>
            <td><a href="/author/update/${author.id}">update</a></td>
            <td>
            <form action="/author/delete_process" method = "post" >
              <input type="hidden" name = id value="${author.id}">
              <input type="submit" value="delete">
            </form>
            </td>`;
      tag += '</tr>';
    });
    tag += `
          <style>
              table{
                  border-collapse:collapse;
              }
              td {
                  border:1px solid black;
              }
          </style>
      `;
    return tag;
  }
}

module.exports = template;

