var conn = require('./db');
var template = require('./template.js');

var authData = {
    email: 'diable@naver.com',
    password: 'vkjhzkxchvkasdf',
    nickname: 'asdfasdf'
}

login = function (request, response) {
    var fmsg = request.flash();
    var feedback = ``;
    if (fmsg.error) {
        feedback = fmsg.error[0];
    }
    var title = 'login';
    var list = template.list(request.list);
    var html = template.html(title, list,
        `
        <div style="color:red;">${feedback}</div>
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

register = function (request, response) {
    var fmsg = request.flash();
    var feedback = ``;
    if (fmsg.error) {
        feedback = fmsg.error[0];
    }
    var title = 'login';
    var list = template.list(request.list);
    var html = template.html(title, list,
        `
        <div style="color:red;">${feedback}</div>
        <form action ="/login/register_process" method="post">
        <p><input type="text" name="email" placeholder="email" value="zxcv@gmail.com"></p>
        <p><input type="password" name="password" placeholder="password" value = "1234"></p>
        <p><input type="password" name="password2" placeholder="password" value = "1234"></p>
        <p><input type="text" name="displayName" placeholder="displayName" value = "zxcvzxbc"></p>
        <p><input type="submit" value="register"></p>
        </form>
        `
        , ``
        , login.authStatusUI
    );
    response.writeHead(202);
    response.end(html);
};

register_process = function (request, response) {
    var post = request.body;
    var title = 'register';
    var email = post.email;
    var pwd = post.pass
    var list = template.list(request.list);
    var html = template.html(title, list,
        `
        <form action ="/login/register_process" method="post">
        <p><input type="text" name="email" placeholder="email" value="zxcv@gmail.com"></p>
        <p><input type="password" name="password" placeholder="password" value = "1234"></p>
        <p><input type="password" name="password2" placeholder="password" value = "1234"></p>
        <p><input type="text" name="displayName" placeholder="displayName" value = "zxcvzxbc"></p>
        <p><input type="submit" value="register"></p>
        </form>
        `
        , ``
        , login.authStatusUI
    );
    response.writeHead(202);
    response.end(html);
};

logout_process = function (request, response) {
    request.logout(function (err) {
        if (err) { return next(err); }
        request.session.save(function () {
            response.redirect('/');
        })
    });
};


authIsOwner = function (request, response) {
    if (request.user) {
        return true;
    } else {
        return false;
    }
};

authStatusUI = function (request, response) {
    var isAdmin = authIsOwner(request, response);
    if (isAdmin) {
        return `${request.user.nickname} | <a href="/login/logout_process">logout</a>`;
    }
    else {
        return '<a href="/login">login</a> | <a href="/login/register">register</a>';
    }

};

exports.login = login;
exports.register = register;
exports.logout_process = logout_process;
exports.authIsOwner = authIsOwner;
exports.authStatusUI = authStatusUI;