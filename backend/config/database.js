const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'trouve_ton_artisan',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    }
);

module.exports = sequelize;