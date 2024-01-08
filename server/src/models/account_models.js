const { DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Import từ file cấu hình kết nối
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Roles = require('./roles_models')

const Account = sequelize.define('Account', {
    email: {
        type: DataTypes.STRING(50),
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    refreshToken: {
        type: String,
    },
    passwordChangedAt: {
        type: String,
    },
    passwordResetToken: {
        type: String,
    },
    otpCode: DataTypes.STRING(10),
    passwordResetExpires: {
        type: DataTypes.BIGINT,
    },
    status: {
        type: String,
        default: 'Locked',
        enum: ['Active', 'Locked'],
    },

},
    {
        tableName: 'account', // Tên của bảng trong cơ sở dữ liệu
        timestamps: false // Không tạo cột 'createdAt' và 'updatedAt'
    });

Account.belongsTo(Roles, { foreignKey: "role_Id", targetKey: 'id', as: 'Role' });

Account.prototype.isCorrectPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

Account.prototype.createPasswordChangedToken = async function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    return resetToken;
};
// Đồng bộ hóa model với cơ sở dữ liệu
// Account.sync()
//     .then(() => {
//         console.log('Model đã được đồng bộ hóa với cơ sở dữ liệu.');
//     })
//     .catch(error => {
//         console.error('Lỗi khi đồng bộ hóa model:', error);
//     });

module.exports = Account;