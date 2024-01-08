const { v4: uuidv4 } = require('uuid');
const PromotionEventService = require('../services/promotion_event_services');

// Lấy danh sách tất cả sự kiện khuyến mãi
const getAllPromotionEvents = async (req, res) => {
    try {
        const events = await PromotionEventService.getAllPromotionEvents();
        res.json(events);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sự kiện khuyến mãi:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách sự kiện khuyến mãi.' });
    }
};

// Lấy thông tin sự kiện khuyến mãi bằng ID
const getPromotionEventById = async (req, res) => {
    try {
        const id = req.params.id;
        const event = await PromotionEventService.getPromotionEventById(id);
        if (!event) {
            return res.status(404).json({ error: 'Không tìm thấy sự kiện khuyến mãi.' });
        }

        res.json(event);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin sự kiện khuyến mãi:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin sự kiện khuyến mãi.' });
    }
};

// Tạo sự kiện khuyến mãi mới
const createNewPromotionEvent = async (req, res) => {
    try {
        const id = uuidv4();
        const inputData = req.body;
        const eventData = { id, ...inputData };

        const createdEvent = await PromotionEventService.createPromotionEvent(eventData);
        res.status(201).json(createdEvent);
    } catch (error) {
        console.error('Lỗi khi tạo sự kiện khuyến mãi mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo sự kiện khuyến mãi mới.' });
    }
};

// Cập nhật thông tin sự kiện khuyến mãi bằng ID
const updatePromotionEventById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const eventData = { ...inputData };
        const updatedEvent = await PromotionEventService.updatePromotionEvent(id, eventData);

        if (!updatedEvent) {
            return res.status(404).json({ error: 'Sự kiện khuyến mãi không tồn tại' });
        }

        res.json(updatedEvent);
    } catch (error) {
        console.error('Lỗi khi cập nhật sự kiện khuyến mãi:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật sự kiện khuyến mãi.' });
    }
};

// Xóa sự kiện khuyến mãi bằng ID
const deletePromotionEventById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await PromotionEventService.deletePromotionEvent(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy sự kiện khuyến mãi.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa sự kiện khuyến mãi:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa sự kiện khuyến mãi.' });
    }
};

module.exports = {
    getAllPromotionEvents,
    getPromotionEventById,
    createNewPromotionEvent,
    updatePromotionEventById,
    deletePromotionEventById
};
