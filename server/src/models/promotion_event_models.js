const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const PromotionEvent = sequelize.define('PromotionEvent', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    description: {
        type: DataTypes.TEXT,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    status: DataTypes.BOOLEAN,
    start_day: DataTypes.DATE,
    end_day: DataTypes.DATE,
    type: {
        type: DataTypes.STRING(50),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
}, {
    tableName: 'promotion_event',
    timestamps: false,
});

PromotionEvent.sync()
    .then(() => {
        console.log('Mô hình PromotionEvent đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình PromotionEvent:', error);
    });

module.exports = PromotionEvent;
