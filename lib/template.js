
const template = {
  html: function (title, list, body, control, authStatusUI = `<a href="/login">login</a> | <a href="/login/register">register</a>`) {
    return `
      <!doctype html>
      <html>
      <head>
        <title>WEB3234 - ${title}</title>
        <meta charset="utf-8">
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <meta name="google-signin-client_id" content="177128601796-050pfsgvk51dmcvgvgk0373beh86gtm2.apps.googleusercontent.com">
        <script>
        function onSignIn(googleUser) {
          var profile = googleUser.getBasicProfile();
          console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
          console.log('Name: ' + profile.getName());
          console.log('Image URL: ' + profile.getImageUrl());
          console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        }
        </script>
        </head>
      <body>
        ${authStatusUI}
        <h1><a href="/">WEB</a></h1>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
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

