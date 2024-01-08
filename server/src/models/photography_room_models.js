const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const PhotographyRoom = sequelize.define('PhotographyRoom', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  is_status: DataTypes.BOOLEAN,
  category: {
    type: DataTypes.STRING(50),
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  price: DataTypes.DECIMAL(18, 3),
}, {
  tableName: 'photography_room',
  timestamps: false,
});

PhotographyRoom.sync()
  .then(() => {
    console.log('Mô hình PhotographyRoom đã được đồng bộ hóa với cơ sở dữ liệu.');
  })
  .catch(error => {
    console.error('Lỗi khi đồng bộ hóa mô hình PhotographyRoom:', error);
  });

module.exports = PhotographyRoom;
