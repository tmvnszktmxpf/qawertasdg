const conn = require('./db');
const template = require('./template.js');
const crypto = require("crypto");
const bcrypt = require('bcrypt');


login = function (request, response) {
    const fmsg = request.flash();
    const feedback = ``;
    if (fmsg.error) {
        feedback = fmsg.error[0];
    }
    const title = 'login';
    const list = template.list(request.list);
    const html = template.html(title, list,
        `
        <div style="color:red;">${feedback}</div>
        <form action ="/login/login_process" method="post">
        <p><input type="text" name="name" placeholder="name"></p>
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
    const title = 'login';
    const list = template.list(request.list);
    const html = template.html(title, list,
        `
        <form action ="/login/register_process" method="post">
        <p><input type="text" name="name" placeholder="name" ></p>
        <p><input type="text" name="email" placeholder="email" ></p>
        <p><input type="password" name="password" placeholder="password" ></p>
        <p><input type="password" name="password2" placeholder="password" ></p>
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
    const post = request.body;
    const id = crypto.randomBytes(16).toString("hex");
    console.log(id);
    if (post.password !== post.password2) {
        request.flash('error', 'password differnt');
        response.redirect('/login/register');
        response.end();
    } else {
        bcrypt.hash(post.password, 10, function (err, hash) {
            // Store hash in your password DB.
            const uu = {
                id: id,
                email: post.email,
                name: post.name,
                profile: post.profile
            }
            conn.query(`
            INSERT INTO user (id,name, password,email) 
                VALUES(?, ?,?,?)`,
                [id, post.name, hash, post.email],
                function (error, result) {
                    request.login(uu, (err) => {
                        response.writeHead(302, { Location: `/` });
                        response.end();
                    })
                })
        });
    }
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
    const isAdmin = authIsOwner(request, response);
    // console.log("zxcvzxcvzxcvzxcvzxcvzxc", request.user);
    if (isAdmin) {
        return `${request.user.name} | <a href="/login/logout_process">logout</a>`;
    }
    else {
        return `
            <a href="/login">login</a> | 
            <a href="/login/register">register</a> |
            <a href="/login/google"> Login with google </a>
        `;
    }

};

exports.login = login;
exports.register = register;
exports.logout_process = logout_process;
exports.authIsOwner = authIsOwner;
exports.authStatusUI = authStatusUI;
exports.register_process = register_process;