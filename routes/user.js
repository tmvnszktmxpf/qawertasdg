const express = require('express')
const router = express.Router();
const user = require('../lib/user');



const path = require("path");

const fs = require("fs");
const filePath = path.join(__dirname, "item_ids.csv_output.csv");



router.post('/', (req, res, next) => {
    console.log('routeuser');
    const data = fs.readFileSync(filePath,{encoding:"utf8"});
    const rows = data.split("\n");
    const post = request.body;
    console.log(post.userid);
    user.user(req, res, next);
})

module.exports = router;