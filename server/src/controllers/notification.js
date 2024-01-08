const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const NotificationService = require('../services/notification');

// Lấy danh sách tất cả thông báo
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await NotificationService.getAllNotifications();
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Lấy thông tin thông báo bằng ID
const getNotificationById = async (req, res) => {
    try {
        const id = req.params.id;
        const notification = await NotificationService.getNotificationById(id);
        if (!notification) {
            return res.status(404).json({ error: 'Không tìm thấy thông báo.' });
        }

        res.json(notification);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin thông báo:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin thông báo.' });
    }
};

// Tạo thông báo mới
const createNewNotification = async (req, res) => {
    try {
        const inputData = req.body;
        const id = uuidv4();
        const notificationData = { id, ...inputData };

        const notification = await NotificationService.createNotification(notificationData);
        res.status(201).json(notification);
    } catch (error) {
        console.error('Lỗi khi tạo thông báo mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo thông báo mới.' });
    }
};

// Cập nhật thông tin thông báo
const updateNotificationById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const notificationData = { ...inputData };

        const updatedNotification = await NotificationService.updateNotification(id, notificationData);
        if (!updatedNotification) {
            return res.status(404).json({ error: 'Thông báo không tồn tại' });
        }

        res.json(updatedNotification);
    } catch (error) {
        console.error('Lỗi khi cập nhật thông báo:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thông báo.' });
    }
};

// Xóa thông báo
const deleteNotificationById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await NotificationService.deleteNotification(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy thông báo.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa thông báo:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa thông báo.' });
    }
};

module.exports = {
    getAllNotifications,
    getNotificationById,
    createNewNotification,
    updateNotificationById,
    deleteNotificationById
};
