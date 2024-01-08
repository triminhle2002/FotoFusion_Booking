const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Location = sequelize.define('Location', {
    id: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
    },
    type: {
        type: DataTypes.STRING(255),
    },
    description: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'locations',
    timestamps: false,
});


// Đồng bộ hóa model với cơ sở dữ liệu
Location.sync({ force: false })
    .then(() => {
        console.log('Model synced with database');
    })
    .catch((err) => {
        console.error('Error syncing model with database:', err);
    });

module.exports = Location;
