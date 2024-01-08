const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./users_models'); // Import mô hình User
const Order = require('./orders_models'); // Import mô hình Order
const BookingDetail = require('./booking_detail_models'); // Import mô hình BookingDetail

const HistoryPayment = sequelize.define('HistoryPayment', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    user_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    order_id: DataTypes.STRING(50),
    booking_id: DataTypes.STRING(50),
    payment_amount: DataTypes.DECIMAL(18, 3),
    date_create: DataTypes.DATE,
}, {
    tableName: 'history_payment',
    timestamps: false,
});

HistoryPayment.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
HistoryPayment.belongsTo(Order, { foreignKey: 'order_id', targetKey: 'id' });
HistoryPayment.belongsTo(BookingDetail, { foreignKey: 'booking_id', targetKey: 'id' });

HistoryPayment.sync()
    .then(() => {
        console.log('Mô hình HistoryPayment đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình HistoryPayment:', error);
    });

module.exports = HistoryPayment;
