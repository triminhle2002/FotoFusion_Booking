const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const BookingDetail = require('./booking_detail_models'); // Import mô hình BookingDetail

const Calendar = sequelize.define('Calendar', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    is_status: DataTypes.BOOLEAN,
    booking_id: DataTypes.STRING(50),
}, {
    tableName: 'calendar',
    timestamps: false,
});

Calendar.belongsTo(BookingDetail, { foreignKey: 'booking_id', targetKey: 'id' });

// Calendar.sync()
//     .then(() => {
//         console.log('Mô hình Calendar đã được đồng bộ hóa với cơ sở dữ liệu.');
//     })
//     .catch(error => {
//         console.error('Lỗi khi đồng bộ hóa mô hình Calendar:', error);
//     });

module.exports = Calendar;
