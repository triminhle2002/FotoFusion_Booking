const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Voucher = sequelize.define('Voucher', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    value: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
}, {
    tableName: 'voucher',
    timestamps: false,
});

Voucher.sync()
    .then(() => {
        console.log('Mô hình Voucher đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình Voucher:', error);
    });

module.exports = Voucher;
