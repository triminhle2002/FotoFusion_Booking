const { v4: uuidv4 } = require('uuid');
const OrdersService = require('../services/orders_services');

// Lấy danh sách tất cả đơn hàng
const getAllOrders = async (req, res) => {
    try {
        const orders = await OrdersService.getAllOrders();
        res.json(orders);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách đơn hàng.' });
    }
};

// Lấy thông tin đơn hàng bằng ID
const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await OrdersService.getOrderById(id);
        if (!order) {
            return res.status(404).json({ error: 'Không tìm thấy đơn hàng.' });
        }

        res.json(order);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin đơn hàng.' });
    }
};
const getOrderByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await OrdersService.getAllOrdersByUserId(id);
        if (!order) {
            return res.status(404).json({ error: 'Không tìm thấy đơn hàng.' });
        }

        res.json(order);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin đơn hàng.' });
    }
};

// Tạo đơn hàng mới
const createNewOrder = async (req, res) => {
    try {
        const id = uuidv4();
        const inputData = req.body;
        const orderData = { id, ...inputData };
        const order = await OrdersService.createOrder(orderData);
        res.status(201).json(order);
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo đơn hàng mới.' });
    }
};

// Cập nhật thông tin đơn hàng bằng ID
const updateOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const orderData = req.body;
        const updatedOrder = await OrdersService.updateOrder(id, orderData);

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Đơn hàng không tồn tại' });
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error('Lỗi khi cập nhật đơn hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật đơn hàng.' });
    }
};

// Xóa đơn hàng bằng ID
const deleteOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await OrdersService.deleteOrder(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy đơn hàng.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa đơn hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa đơn hàng.' });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createNewOrder,
    updateOrderById,
    deleteOrderById,
    getOrderByUserId
};
