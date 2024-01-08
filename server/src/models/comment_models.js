const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./users_models'); // Import mô hình User
const VideoAlbum = require('./video_albums_models'); // Import mô hình VideoAlbum
const PhotoAlbum = require('./photo_albums_models'); // Import mô hình PhotoAlbum
const BlogPost = require('./blog_post_models'); // Import mô hình BlogPost
const Product = require('./product_models'); // Import mô hình Product

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    user_id: DataTypes.STRING(50),
    vidab_id: DataTypes.STRING(50),
    phoab_id: DataTypes.STRING(50),
    prod_id: DataTypes.STRING(50),
    blog_post_id: DataTypes.STRING(50),
    content: {
        type: DataTypes.TEXT,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
}, {
    tableName: 'comment',
    timestamps: false,
});

Comment.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id', as: 'user' });
Comment.belongsTo(VideoAlbum, { foreignKey: 'vidab_id', targetKey: 'id' });
Comment.belongsTo(PhotoAlbum, { foreignKey: 'phoab_id', targetKey: 'id' });
Comment.belongsTo(BlogPost, { foreignKey: 'blog_post_id', targetKey: 'id' });
Comment.belongsTo(Product, { foreignKey: 'prod_id', targetKey: 'id' });

Comment.sync()
    .then(() => {
        console.log('Mô hình Comment đã được đồng bộ hóa với cơ sở dữ liệu.');
    })
    .catch(error => {
        console.error('Lỗi khi đồng bộ hóa mô hình Comment:', error);
    });

module.exports = Comment;