const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');


const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    description: {
        type: DataTypes.TEXT,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    category: {
        type: DataTypes.STRING(20),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    price: DataTypes.DECIMAL(18, 3),
    discounted_price: DataTypes.DECIMAL(18, 3),
}, {
    tableName: 'products',
    timestamps: false,
});


Product.sync()
    .then(() => {
        console.log('Mô hình Product đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình Product:', error);
    });

module.exports = Product;
