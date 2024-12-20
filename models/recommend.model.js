const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');
const User = require('./user.model');

const Recommend = sequelize.define('Recommend', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        },
    },
}, {
    timestamps: true,
    tableName: 'recommends',
});
User.hasMany(Recommend, { foreignKey: 'userId', as: 'recommends' });
Recommend.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Recommend;
