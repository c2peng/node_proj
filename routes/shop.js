const express = require('express');
const path = require('path');
const adminData = require('./admin.js');

const router = express.Router();
router.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop',{prods: products, docTitle: 'Shop'});
});

module.exports = router;