const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./users_models'); // Import mô hình User

const PhotoAlbum = sequelize.define('PhotoAlbum', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    user_id: DataTypes.STRING(50),
    cover_photo: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    sum_photo: DataTypes.INTEGER,
    category: {
        type: DataTypes.STRING(50),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    location: {
        type: DataTypes.STRING(50),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    date_create: DataTypes.DATE,
}, {
    tableName: 'photo_albums',
    timestamps: false,
});

PhotoAlbum.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });

PhotoAlbum.sync()
    .then(() => {
        console.log('Mô hình PhotoAlbum đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình PhotoAlbum:', error);
    });

module.exports = PhotoAlbum;
