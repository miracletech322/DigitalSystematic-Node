const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
});

// Test the connection
sequelize
    .authenticate()
    .then(() => console.log('Connection to MySQL successful!'))
    .catch((error) => console.error('Unable to connect to MySQL:', error));

module.exports = sequelize;
