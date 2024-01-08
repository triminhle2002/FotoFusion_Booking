const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./users_models'); // Import mô hình User

const VideoAlbum = sequelize.define('VideoAlbum', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    cover_photo: {
        type: DataTypes.STRING(255),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    user_id: DataTypes.STRING(50),
    sum_photo: DataTypes.INTEGER,
    category: {
        type: DataTypes.STRING(50),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    location: {
        type: DataTypes.STRING(100),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    date_create: DataTypes.DATE,
}, {
    tableName: 'video_albums',
    timestamps: false,
});

VideoAlbum.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });

VideoAlbum.sync()
    .then(() => {
        console.log('Mô hình VideoAlbum đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình VideoAlbum:', error);
    });

module.exports = VideoAlbum;
