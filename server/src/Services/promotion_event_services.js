const PromotionEvent = require('../models/promotion_event_models');

class PromotionEventService {
    async getPromotionEventById(id) {
        try {
            const event = await PromotionEvent.findByPk(id);
            return event;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin sự kiện khuyến mãi:', error);
            throw error;
        }
    }

    async getAllPromotionEvents() {
        try {
            const events = await PromotionEvent.findAll();
            return events;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách sự kiện khuyến mãi:', error);
            throw error;
        }
    }

    async createPromotionEvent(eventData) {
        try {
            const event = await PromotionEvent.create(eventData);
            return event;
        } catch (error) {
            console.error('Lỗi khi tạo sự kiện khuyến mãi:', error);
            throw error;
        }
    }

    async updatePromotionEvent(id, eventData) {
        try {
            const event = await PromotionEvent.findByPk(id);

            if (!event) {
                return null;
            }

            await event.update(eventData);
            return event;
        } catch (error) {
            console.error('Lỗi khi cập nhật sự kiện khuyến mãi:', error);
            throw error;
        }
    }

    async deletePromotionEvent(id) {
        try {
            const event = await PromotionEvent.findByPk(id);

            if (!event) {
                return false;
            }

            await event.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa sự kiện khuyến mãi:', error);
            throw error;
        }
    }
}

module.exports = new PromotionEventService();
