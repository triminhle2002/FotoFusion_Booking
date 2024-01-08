const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const PhotoAlbum = require('./photo_albums_models'); // Import mô hình PhotoAlbum
const VideoAlbum = require('./video_albums_models'); // Import mô hình VideoAlbum

const PriceList = sequelize.define('PriceList', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    photo_album_id: DataTypes.STRING(50),
    video_albums_id: DataTypes.STRING(50),
    name: {
        type: DataTypes.STRING(50),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    price: DataTypes.DECIMAL(18, 3),
    number_camera: DataTypes.TEXT,
    number_photo: DataTypes.TEXT,
    light_equip: DataTypes.TEXT,
    location: DataTypes.TEXT,
    number_photographer: DataTypes.TEXT,
    number_assistant_photographer: DataTypes.TEXT,
    camera_equipment: DataTypes.TEXT,
    description: DataTypes.TEXT,
    additional_info: DataTypes.TEXT,
}, {
    tableName: 'price_List',
    timestamps: false,
});

PriceList.belongsTo(PhotoAlbum, { foreignKey: 'photo_album_id', targetKey: 'id' });
PriceList.belongsTo(VideoAlbum, { foreignKey: 'video_albums_id', targetKey: 'id' });

PriceList.sync()
    .then(() => {
        console.log('Mô hình PriceList đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình PriceList:', error);
    });

module.exports = PriceList;
