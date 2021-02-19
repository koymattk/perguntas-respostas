require('dotenv').config();

const Sequelize = require('sequelize');

const connection = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.PASSWORD_DATABASE,
    {
        host:process.env.DATABASE_HOST,
        dialect:'mysql'
    }
    );

    module.exports = connection;