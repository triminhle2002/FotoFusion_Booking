const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./users_models'); // Import mô hình User

const Request = sequelize.define('Request', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    user_id: DataTypes.STRING(50),
    img_url_old: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    img_url_new: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    request: {
        type: DataTypes.TEXT,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    is_status: DataTypes.BOOLEAN,
    status: {
        type: DataTypes.ENUM('Chưa Thực Hiện', 'Đang Thực Hiện', 'Hoàn Thành'),
        allowNull: false,
        defaultValue: 'Chưa Thực Hiện',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
}, {
    tableName: 'request',
    timestamps: false,
});

Request.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });

Request.sync()
    .then(() => {
        console.log('Mô hình Request đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình Request:', error);
    });

module.exports = Request;
