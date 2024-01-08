const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Users = require('./users_models');


const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'Notification',
    timestamps: true,
});

Notification.belongsTo(Users, { foreignKey: 'user_id', targetKey: 'id' });


module.exports = Notification;