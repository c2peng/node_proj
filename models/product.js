const Sequelize = require('sequelize');

const sequelize = require('../utils/database.js');

const Product = sequelize.define('product', {
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allownull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allownull: false,
    },
    description: {
        type: Sequelize.STRING,
        allownull: false,
    }
});

module.exports = Product;