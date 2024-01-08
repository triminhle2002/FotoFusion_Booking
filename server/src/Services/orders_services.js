const Order = require('../models/orders_models');

class OrderService {
    async getOrderById(id) {
        try {
            const order = await Order.findByPk(id);
            return order;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin đơn hàng:', error);
            throw error;
        }
    }

    async getAllOrders() {
        try {
            const orders = await Order.findAll();
            return orders;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
            throw error;
        }
    }
    async getAllOrdersByUserId(user_id) {
        try {
            const orders = await Order.findAll({
                where: {
                    user_id: user_id
                }
            });
            return orders;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
            throw error;
        }
    }

    async createOrder(orderData) {
        try {
            const order = await Order.create(orderData);
            return order;
        } catch (error) {
            console.error('Lỗi khi tạo đơn hàng:', error);
            throw error;
        }
    }

    async updateOrder(id, orderData) {
        try {
            const order = await Order.findByPk(id);

            if (!order) {
                return null;
            }

            await order.update(orderData);
            return order;
        } catch (error) {
            console.error('Lỗi khi cập nhật đơn hàng:', error);
            throw error;
        }
    }

    async deleteOrder(id) {
        try {
            const order = await Order.findByPk(id);

            if (!order) {
                return false;
            }

            await order.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa đơn hàng:', error);
            throw error;
        }
    }
}

module.exports = new OrderService();
