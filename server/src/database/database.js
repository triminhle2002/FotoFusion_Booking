const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql', // Loại cơ sở dữ liệu
    pool: {
      max: 10, // Số kết nối tối đa trong pool
      min: 0, // Số kết nối tối thiểu trong pool
      acquire: 30000, // Thời gian tối đa để lấy một kết nối từ pool
      idle: 10000, // Thời gian tối đa một kết nối có thể ở trong pool mà không bị đóng
    },
  }
);

module.exports = sequelize;