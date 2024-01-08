const { v4: uuidv4 } = require('uuid');
const OrderDetailService = require('../services/orders_details_services');

// Lấy danh sách tất cả các chi tiết đơn hàng
const getAllOrderDetails = async (req, res) => {
    try {
        const orderDetails = await OrderDetailService.getAllOrderDetails();
        res.json(orderDetails);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách chi tiết đơn hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách chi tiết đơn hàng.' });
    }
};

// Lấy thông tin chi tiết đơn hàng bằng ID
const getOrderDetailById = async (req, res) => {
    try {
        const id = req.params.id;
        const orderDetail = await OrderDetailService.getOrderDetailById(id);
        if (!orderDetail) {
            return res.status(404).json({ error: 'Không tìm thấy chi tiết đơn hàng.' });
        }

        res.json(orderDetail);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin chi tiết đơn hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin chi tiết đơn hàng.' });
    }
};
// Lấy thông tin chi tiết đơn hàng bằng ID
const getOrderDetailByOrderId = async (req, res) => {
    try {
        const id = req.params.id;
        const orderDetail = await OrderDetailService.getOrderDetailByOrderId(id);
        if (!orderDetail) {
            return res.status(404).json({ error: 'Không tìm thấy chi tiết đơn hàng.' });
        }

        res.json(orderDetail);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin chi tiết đơn hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin chi tiết đơn hàng.' });
    }
};

// Tạo chi tiết đơn hàng mới
const createNewOrderDetail = async (req, res) => {
    try {
        const id = uuidv4();
        const inputData = req.body;
        const orderDetailData = { id, ...inputData };
        const orderDetail = await OrderDetailService.createOrderDetail(orderDetailData);
        res.status(201).json(orderDetail);
    } catch (error) {
        console.error('Lỗi khi tạo chi tiết đơn hàng mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo chi tiết đơn hàng mới.' });
    }
};

// Cập nhật thông tin chi tiết đơn hàng bằng ID
const updateOrderDetailById = async (req, res) => {
    try {
        const id = req.params.id;
        const orderDetailData = req.body;
        const updatedOrderDetail = await OrderDetailService.updateOrderDetail(id, orderDetailData);

        if (!updatedOrderDetail) {
            return res.status(404).json({ error: 'Chi tiết đơn hàng không tồn tại' });
        }

        res.json(updatedOrderDetail);
    } catch (error) {
        console.error('Lỗi khi cập nhật chi tiết đơn hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật chi tiết đơn hàng.' });
    }
};

// Xóa chi tiết đơn hàng bằng ID
const deleteOrderDetailById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await OrderDetailService.deleteOrderDetail(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy chi tiết đơn hàng.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa chi tiết đơn hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa chi tiết đơn hàng.' });
    }
};
const deleteAllOrderByOrderId = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await OrderDetailService.deleteAllOrderByOrderId(id)
        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy chi tiết đơn hàng.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa chi tiết đơn hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa chi tiết đơn hàng.' });
    }
}
module.exports = {
    getAllOrderDetails,
    getOrderDetailById,
    createNewOrderDetail,
    updateOrderDetailById,
    deleteOrderDetailById,
    getOrderDetailByOrderId,
    deleteAllOrderByOrderId
};
