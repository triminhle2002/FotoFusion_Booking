const HistoryPayment = require('../models/history_payment_models');

class HistoryPaymentService {
    async getHistoryPaymentById(id) {
        try {
            const historyPayment = await HistoryPayment.findByPk(id);
            return historyPayment;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin lịch sử thanh toán:', error);
            throw error;
        }
    }

    async getAllHistoryPayments() {
        try {
            const historyPayments = await HistoryPayment.findAll();
            return historyPayments;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách lịch sử thanh toán:', error);
            throw error;
        }
    }

    async createHistoryPayment(historyPaymentData) {
        try {
            const historyPayment = await HistoryPayment.create(historyPaymentData);
            return historyPayment;
        } catch (error) {
            console.error('Lỗi khi tạo lịch sử thanh toán:', error);
            throw error;
        }
    }

    async updateHistoryPayment(id, historyPaymentData) {
        try {
            const historyPayment = await HistoryPayment.findByPk(id);

            if (!historyPayment) {
                return null;
            }

            await historyPayment.update(historyPaymentData);
            return historyPayment;
        } catch (error) {
            console.error('Lỗi khi cập nhật lịch sử thanh toán:', error);
            throw error;
        }
    }

    async deleteHistoryPayment(id) {
        try {
            const historyPayment = await HistoryPayment.findByPk(id);

            if (!historyPayment) {
                return false;
            }

            await historyPayment.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa lịch sử thanh toán:', error);
            throw error;
        }
    }
}

module.exports = new HistoryPaymentService();
