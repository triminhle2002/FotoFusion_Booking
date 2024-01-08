const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Account = require('./account_models'); // Import mô hình Account
const Voucher = require('./voucher_models'); // Import mô hình Voucher

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    email: DataTypes.STRING(50),
    address: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    name: {
        type: DataTypes.STRING(50),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    gender: {
        type: DataTypes.STRING(5),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    avatar_url: {
        type: DataTypes.STRING(255),
    }
}, {
    tableName: 'users',
    timestamps: false,
});

User.belongsTo(Account, { foreignKey: 'email', targetKey: 'email', as: 'account' });


User.sync()
    .then(() => {
        console.log('Mô hình User đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình User:', error);
    });

module.exports = User;
