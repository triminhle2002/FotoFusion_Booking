const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
}, {
    tableName: 'roles',
    timestamps: false,
});

Role.sync()
    .then(() => {
        console.log('Mô hình Role đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình Role:', error);
    });

module.exports = Role;
