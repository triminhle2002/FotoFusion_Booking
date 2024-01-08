const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Costume = require('./costume_models'); // Import mô hình Costume
const PhotoAlbum = require('./photo_albums_models'); // Import mô hình PhotoAlbum
const PromotionEvent = require('./promotion_event_models'); // Import mô hình PromotionEvent
const PhotographyRoom = require('./photography_room_models'); // Import mô hình PhotographyRoom
const User = require('./users_models'); // Import mô hình User
const Product = require('./product_models'); // Import mô hình Product
const BlogPost = require('./blog_post_models'); // Import mô hình BlogPost
const Equipment = require('./equipment_models'); // Import mô hình Equipment
const Location = require('./locations_models'); // Import mô hình Equipment

const Photo = sequelize.define('Photo', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    img_name: {
        type: DataTypes.STRING(50),
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    url_photo: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    costume_id: DataTypes.STRING(50),
    albums_id: DataTypes.STRING(50),
    event_id: DataTypes.STRING(50),
    room_id: DataTypes.STRING(50),
    user_id: DataTypes.STRING(50),
    prod_id: DataTypes.STRING(50),
    blog_id: DataTypes.STRING(50),
    equip_id: DataTypes.STRING(50),
    locations_id: DataTypes.STRING(50),

}, {
    tableName: 'photos',
    timestamps: false,
});

Photo.belongsTo(Costume, { foreignKey: 'costume_id', targetKey: 'id' });
Photo.belongsTo(PhotoAlbum, { foreignKey: 'albums_id', targetKey: 'id' });
Photo.belongsTo(PromotionEvent, { foreignKey: 'event_id', targetKey: 'id' });
Photo.belongsTo(PhotographyRoom, { foreignKey: 'room_id', targetKey: 'id' });
Photo.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
Photo.belongsTo(Product, { foreignKey: 'prod_id', targetKey: 'id', as: 'product' });
Photo.belongsTo(BlogPost, { foreignKey: 'blog_id', targetKey: 'id' });
Photo.belongsTo(Equipment, { foreignKey: 'equip_id', targetKey: 'id' });
Photo.belongsTo(Location, { foreignKey: 'locations_id', targetKey: 'id', as: 'location' });


Photo.sync()
    .then(() => {
        console.log('Mô hình Photo đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình Photo:', error);
    });

module.exports = Photo;