const express = require('express')
const router = express.Router();
var page = require('../lib/topic');




router.get('/create', (req, res) => {
    page.create(req, res);
})

router.post('/create_process', (req, res) => {
    page.create_process(req, res);
})

router.get('/update/:pageID', (req, res) => {
    page.update(req, res);
})

router.post('/update_process', (req, res) => {
    page.update_process(req, res);
})

router.post('/delete_process', (req, res) => {
    page.delete_process(req, res);
})

router.get('/:pageID', (req, res, next) => {
    console.log(`
    
    
    
    
    
    2
    
    
    
    
    `);
    page.page(req, res);
})

module.exports = router;