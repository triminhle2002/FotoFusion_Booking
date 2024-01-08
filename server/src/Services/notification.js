const Notification = require('../models/notification');
const Users = require('../models/users_models');

class NotificationService {
    async getNotificationById(id) {
        try {
            const notification = await Notification.findByPk(id, {
                include: [
                    { model: Users, as: 'user' },
                ],
            });
            return notification;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin thông báo:', error);
            throw error;
        }
    }

    async getAllNotifications() {
        try {
            const notifications = await Notification.findAll({
                include: [
                    { model: Users, as: 'user' },
                ],
            });
            return notifications;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách thông báo:', error);
            throw error;
        }
    }

    async createNotification(notificationData) {
        try {
            const notification = await Notification.create(notificationData);
            return notification;
        } catch (error) {
            console.error('Lỗi khi tạo thông báo:', error);
            throw error;
        }
    }

    async updateNotification(id, notificationData) {
        try {
            const notification = await Notification.findByPk(id);

            if (!notification) {
                return null;
            }

            await notification.update(notificationData);
            return notification;
        } catch (error) {
            console.error('Lỗi khi cập nhật thông báo:', error);
            throw error;
        }
    }

    async deleteNotification(id) {
        try {
            const notification = await Notification.findByPk(id);

            if (!notification) {
                return false;
            }

            await notification.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa thông báo:', error);
            throw error;
        }
    }
}

module.exports = new NotificationService();
