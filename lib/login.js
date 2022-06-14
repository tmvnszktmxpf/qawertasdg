var conn = require('./db');
var template = require('./template.js');

var authData = {
    email: 'diable@naver.com',
    password: 'vkjhzkxchvkasdf',
    nickname: 'asdfasdf'
}

login = function (request, response) {
    var title = 'login';
    var list = template.list(request.list);
    var html = template.html(title, list,
        `
        <form action ="/login/login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="password" placeholder="password"></p>
        <p><input type="submit" value="login"></p>
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
    var email = post.email;
    var password = post.password;
    if (email === authData.email && password === authData.password) {

        request.session.is_logined = true;
        request.session.nickname = authData.nickname;
        response.redirect('/');

    } else {
        response.send('Who?');
    }
};

logout_process = function (request, response) {
    request.session.destroy((err) => {
        response.redirect('/');
    })
};


authIsOwner = function (request, response) {
    if (request.session.is_logined) {
        return true;
    } else {
        return false;
    }
};

authStatusUI = function (request, response) {
    var isAdmin = authIsOwner(request, response);
    if (isAdmin) {
        return `${authData.nickname}|<a href="/login/logout_process">logout</a>`;
    }
    else {
        return '<a href="/login">login</a>';
    }

};

exports.login = login;
exports.login_process = login_process;
exports.logout_process = logout_process;
exports.authIsOwner = authIsOwner;
exports.authStatusUI = authStatusUI;