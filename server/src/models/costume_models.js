const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Costume = sequelize.define('Costume', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    category: {
        type: DataTypes.STRING(50),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    price: DataTypes.DECIMAL(18, 3),
    quantity: DataTypes.INTEGER,
    rental_start_date: DataTypes.STRING(100),

}, {
    tableName: 'costume',
    timestamps: false,
});

Costume.sync()
    .then(() => {
        console.log('Mô hình Costume đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình Costume:', error);
    });

module.exports = Costume;
