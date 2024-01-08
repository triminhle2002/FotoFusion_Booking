const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Equipment = sequelize.define('Equipment', {
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
}, {
    tableName: 'equipment',
    timestamps: false,
});

Equipment.sync()
    .then(() => {
        console.log('Mô hình Equipment đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình Equipment:', error);
    });

module.exports = Equipment;
