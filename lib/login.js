var conn = require('./db');
var template = require('./template.js');

login = function (request, response) {
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
        , login.authStatusUI
    );
    response.writeHead(202);
    response.end(html);
};

login_process = function (request, response) {
    var post = request.body;
    if (post.email === "diable@naver.com" && post.password === '1234') {
        response.writeHead(302, {
            'Set-Cookie': [
                `email=${post.email}; Path=/`,
                `password=${post.password}; Path=/`,
                `nickname=zxcvzxv; Path=/`
            ],
            Location: `/`
        });
        response.end('');
    } else {
        response.end('who?');
    }
};


authIsOwner = function (request, response) {
    var cookie = request.cookies;
    if (cookie.email === 'diable@naver.com' && cookie.password === '1234') {
        return true;
    }
    else {
        return false;
    }

};

authStatusUI = function (request, response) {
    var isAdmin = authIsOwner(request, response);
    if (isAdmin) {
        return '<a href="/logout">logout</a>';
    }
    else {
        return '<a href="/login">login</a>';
    }

};

exports.login = login;
exports.login_process = login_process;
exports.authIsOwner = authIsOwner;
exports.authStatusUI = authStatusUI;