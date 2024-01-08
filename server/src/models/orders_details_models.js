const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Order = require('./orders_models'); // Import mô hình Order
const Product = require('./product_models'); // Import mô hình Product

const OrderDetail = sequelize.define('OrderDetail', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    order_id: DataTypes.STRING(50),
    prod_id: DataTypes.STRING(50),
    quantity: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL(18, 3),
}, {
    tableName: 'order_detail',
    timestamps: false,
});

OrderDetail.belongsTo(Order, { foreignKey: 'order_id', targetKey: 'id' });
OrderDetail.belongsTo(Product, { foreignKey: 'prod_id', targetKey: 'id', as: 'product' });

OrderDetail.sync()
    .then(() => {
        console.log('Mô hình OrderDetail đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình OrderDetail:', error);
    });

module.exports = OrderDetail;
