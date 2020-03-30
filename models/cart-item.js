const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const CartItem = sequelize.define('cartItem', {
    quantity: { type: Sequelize.INTEGER},
    
});

module.exports = CartItem;