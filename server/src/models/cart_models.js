const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./users_models'); // Import mô hình User


const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    user_id: DataTypes.STRING(50),
    total_quantity: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL(18, 3),
}, {
    tableName: 'cart',
    timestamps: false,
});

Cart.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id', as: 'user' });


module.exports = Cart;
