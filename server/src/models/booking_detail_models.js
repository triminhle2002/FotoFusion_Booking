const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Costume = require('./costume_models');
const Price_List = require('./price_list_models');
const Equipment = require('./equipment_models');
const PhotographyRoom = require('./photography_room_models');
const User = require('./users_models');
const Location = require('./locations_models');
const PhotoAlbums = require('./photo_Albums_models');


const BookingDetail = sequelize.define('BookingDetail', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  room_id: DataTypes.STRING(50),
  costume_id: DataTypes.STRING(50),
  equipment_id: DataTypes.STRING(50),
  payment_status: DataTypes.STRING(100),
  price: DataTypes.DECIMAL(18, 3),
  booking_time: DataTypes.DATE,
  price_list_id: DataTypes.STRING(50),
  status: DataTypes.STRING(100),
  messenger: {
    type: DataTypes.TEXT,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  },
  locationText: {
    type: DataTypes.TEXT,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  },
  locations_id: DataTypes.STRING(50),
  time_try_customer: DataTypes.DATE,
  albums_id: DataTypes.STRING(50),
}, {
  tableName: 'booking_detail',
  timestamps: false,
});

BookingDetail.belongsTo(Costume, { foreignKey: 'costume_id', targetKey: 'id', as: "costumes" });
BookingDetail.belongsTo(Price_List, { foreignKey: 'price_list_id', targetKey: 'id', as: "pricelist" });
BookingDetail.belongsTo(Equipment, { foreignKey: 'equipment_id', targetKey: 'id', as: "equipment" });
BookingDetail.belongsTo(PhotographyRoom, { foreignKey: 'room_id', targetKey: 'id', as: "room" });
BookingDetail.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id', as: 'user' });
BookingDetail.belongsTo(Location, { foreignKey: 'locations_id', targetKey: 'id', as: "location" });
BookingDetail.belongsTo(PhotoAlbums, { foreignKey: 'albums_id', targetKey: 'id', as: "albums" });




// BookingDetail.sync()
//   .then(() => {
//     console.log('Mô hình BookingDetail đã được đồng bộ hóa với cơ sở dữ liệu.');
//   })
//   .catch(error => {
//     console.error('Lỗi khi đồng bộ hóa mô hình BookingDetail:', error);
//   });

module.exports = BookingDetail;
