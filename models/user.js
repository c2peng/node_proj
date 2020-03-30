const sequelize = require('../utils/database.js');

const Sequelize = require('sequelize');

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
    },
    email: Sequelize.STRING,

});

module.exports = User;