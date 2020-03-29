//const mysql = require('mysql2');

//const pool = mysql.createPool({
    //host: 'localhost',
    //user: 'root',
    //database: 'node-complete',
    //password: 'Pc040996'
//});

//module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Pc040996', {dialect: 'mysql', host: 'localhost',});

module.exports = sequelize;