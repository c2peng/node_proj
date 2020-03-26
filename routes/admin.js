const express = require('express');
const path = require('path')
const router = express.Router();
const rootDir = require('../utils/path.js');

const products = [];
// /admin/add-product => get
router.get('/add-product', (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Product'});
});

// /admin/add-product => post
router.post('/add-product', (req, res, next) => {
    products.push({
        title: req.body.title
    });
    res.redirect('/');
});

exports.routes = router;
exports.products = products;