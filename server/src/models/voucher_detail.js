// models/voucherDetail.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Users = require('./users_models');
const Voucher = require('./voucher_models');
const VoucherDetail = sequelize.define('VoucherDetail', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    voucher_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    used_at: {
        type: DataTypes.DATE,
    },
    is_used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'voucher_detail',
    timestamps: true,
});

VoucherDetail.belongsTo(Users, { foreignKey: 'user_id', targetKey: 'id' });
VoucherDetail.belongsTo(Voucher, { foreignKey: 'voucher_id', targetKey: 'id' });

module.exports = VoucherDetail;
