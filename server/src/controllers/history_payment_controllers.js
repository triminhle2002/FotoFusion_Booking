const { v4: uuidv4 } = require('uuid');
const HistoryPaymentService = require('../services/history_payment_services');

// Lấy danh sách tất cả lịch sử thanh toán
const getAllHistoryPayments = async (req, res) => {
    try {
        const historyPayments = await HistoryPaymentService.getAllHistoryPayments();
        res.json(historyPayments);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách lịch sử thanh toán:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách lịch sử thanh toán.' });
    }
};

// Lấy thông tin lịch sử thanh toán bằng ID
const getHistoryPaymentById = async (req, res) => {
    try {
        const id = req.params.id;
        const historyPayment = await HistoryPaymentService.getHistoryPaymentById(id);
        if (!historyPayment) {
            return res.status(404).json({ error: 'Không tìm thấy lịch sử thanh toán.' });
        }

        res.json(historyPayment);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin lịch sử thanh toán:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin lịch sử thanh toán.' });
    }
};

// Tạo lịch sử thanh toán mới
const createNewHistoryPayment = async (req, res) => {
    try {
        const { name, user_id, order_id, booking_id, payment_amount, date_create } = req.body;
        const id = uuidv4();
        const historyPaymentData = { id, name, user_id, order_id, booking_id, payment_amount, date_create };
        const historyPayment = await HistoryPaymentService.createHistoryPayment(historyPaymentData);
        res.status(201).json(historyPayment);
    } catch (error) {
        console.error('Lỗi khi tạo lịch sử thanh toán mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo lịch sử thanh toán mới.' });
    }
};

// Cập nhật thông tin lịch sử thanh toán bằng ID
const updateHistoryPaymentById = async (req, res) => {
    try {
        const id = req.params.id;
        const historyPaymentData = req.body;
        const updatedHistoryPayment = await HistoryPaymentService.updateHistoryPayment(id, historyPaymentData);

        if (!updatedHistoryPayment) {
            return res.status(404).json({ error: 'Lịch sử thanh toán không tồn tại' });
        }

        res.json(updatedHistoryPayment);
    } catch (error) {
        console.error('Lỗi khi cập nhật lịch sử thanh toán:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật lịch sử thanh toán.' });
    }
};

// Xóa lịch sử thanh toán bằng ID
const deleteHistoryPaymentById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await HistoryPaymentService.deleteHistoryPayment(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy lịch sử thanh toán.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa lịch sử thanh toán:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa lịch sử thanh toán.' });
    }
};

module.exports = {
    getAllHistoryPayments,
    getHistoryPaymentById,
    createNewHistoryPayment,
    updateHistoryPaymentById,
    deleteHistoryPaymentById
};
