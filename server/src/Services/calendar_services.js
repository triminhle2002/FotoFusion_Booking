const Calendar = require('../models/calendar_models');

class CalendarService {
    async getCalendarById(id) {
        try {
            const calendar = await Calendar.findByPk(id);
            return calendar;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin lịch:', error);
            throw error;
        }
    }

    async getAllCalendars() {
        try {
            const calendars = await Calendar.findAll();
            return calendars;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách lịch:', error);
            throw error;
        }
    }

    async createCalendar(calendarData) {
        try {
            const calendar = await Calendar.create(calendarData);
            return calendar;
        } catch (error) {
            console.error('Lỗi khi tạo lịch:', error);
            throw error;
        }
    }

    async updateCalendar(id, calendarData) {
        try {
            const calendar = await Calendar.findByPk(id);

            if (!calendar) {
                return null;
            }

            await calendar.update(calendarData);
            return calendar;
        } catch (error) {
            console.error('Lỗi khi cập nhật lịch:', error);
            throw error;
        }
    }

    async deleteCalendar(id) {
        try {
            const calendar = await Calendar.findByPk(id);

            if (!calendar) {
                return false;
            }

            await calendar.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa lịch:', error);
            throw error;
        }
    }
}

module.exports = new CalendarService();
