const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const VideoAlbum = require('./video_albums_models'); // Import mô hình VideoAlbum

const Video = sequelize.define('Video', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    albums_id: DataTypes.STRING(50),
    url_video: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(50),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
}, {
    tableName: 'video',
    timestamps: false,
});

Video.belongsTo(VideoAlbum, { foreignKey: 'albums_id', targetKey: 'id' });

Video.sync()
    .then(() => {
        console.log('Mô hình Video đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình Video:', error);
    });

module.exports = Video;
