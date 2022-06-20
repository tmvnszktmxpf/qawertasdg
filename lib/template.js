
const template = {
  html: function (title, list, body, control, authStatusUI = `<a href="/login">login</a> | <a href="/login/register">register</a>`) {
    return `
      <!doctype html>
      <html>
      <head>
        <title>WEB3234 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        ${authStatusUI}
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
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

