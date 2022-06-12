var conn = require('./db');
var template = require('./template.js');

exports.login = function (request, response) {
    var title = 'login';
    var list = template.list(request.list);
    var html = template.html(title, list,
        `
        <form action ="/login/login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="password" placeholder="password"></p>
        <p><input type="submit"></p>
        </form>
        `
        , ``
    );
    response.writeHead(202);
    response.end(html);
};

exports.login_process = function (request, response) {
    var post = request.body;
    if (post.email === "diable@naver.com" && post.password === '1234') {
        response.writeHead(302, {
            'Set-Cookie': [
                `email=${post.email}; Path=/`,
                `password=${post.password}; Path=/`,
                `nickname=zxcvzxv; Path=/`
            ],
            Location: `/page/2`
        });
        response.end('');
    } else {
        response.end('who?');
    }
};