const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./users_models'); // Import mô hình User

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    payment_method: {
        type: DataTypes.STRING(100),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    order_date: DataTypes.DATE,
    total_amount: DataTypes.DECIMAL(18, 3),
    user_id: DataTypes.STRING(50),
    shipping_fee: DataTypes.DECIMAL(18, 3),
}, {
    tableName: 'orders',
    timestamps: false,
});

Order.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });

Order.sync()
    .then(() => {
        console.log('Mô hình Order đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình Order:', error);
    });

module.exports = Order;
