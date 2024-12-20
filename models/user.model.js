const { DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        department: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        managerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        managerNumber: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        parentLevel: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('User', 'Admin', 'Manager'),
            defaultValue: 'User',
            allowNull: false,
        },
    },
    {
        timestamps: true
    }
);

module.exports = User;
