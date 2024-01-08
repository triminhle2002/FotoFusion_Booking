const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Cart = require('./cart_models'); // Import mô hình Cart
const Product = require('./product_models'); // Import mô hình Product

const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    cart_id: DataTypes.STRING(50),
    prod_id: DataTypes.STRING(50),
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(18, 3),
}, {
    tableName: 'cart_items',
    timestamps: false,
});

CartItem.belongsTo(Cart, { foreignKey: 'cart_id', targetKey: 'id', as: 'cart' });
CartItem.belongsTo(Product, { foreignKey: 'prod_id', targetKey: 'id', as: 'product' });

CartItem.sync()
    .then(() => {
        console.log('Mô hình CartItem đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình CartItem:', error);
    });

module.exports = CartItem;
