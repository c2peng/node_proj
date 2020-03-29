const Sequelize = require('sequelize');

const sequelize = require('../utils/database.js');

const Product = sequelize.define('Product', {
    id: {
        type: Sequelize.INTEGER,
        autoincrement: true,
        allownull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allownull: false,
    },
    image: {
        type: Sequelize.STRING,
        allownull: false,
    },
    description: {
        type: Sequelize.STRING,
        allownull: false,
    }
});

module.exports = Product;