const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const OrderItem = sequelize.define('orderItem', {
    quantity: { type: Sequelize.INTEGER},
});

module.exports = OrderItem;