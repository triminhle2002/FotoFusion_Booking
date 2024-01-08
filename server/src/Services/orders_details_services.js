const OrderDetail = require('../models/orders_details_models');
const Product = require('../models/product_models')
class OrderDetailService {
    async getOrderDetailById(id) {
        try {
            const orderDetail = await OrderDetail.findByPk(id);
            return orderDetail;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin chi tiết đơn hàng:', error);
            throw error;
        }
    }

    async getAllOrderDetails() {
        try {
            const orderDetails = await OrderDetail.findAll();
            return orderDetails;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách chi tiết đơn hàng:', error);
            throw error;
        }
    }
    async getOrderDetailByOrderId(order_id) {
        try {
            const orders = await OrderDetail.findAll({
                where: {
                    order_id: order_id
                },
                include: [
                    {
                        model: Product,
                        as: 'product',
                    },
                ],
            });
            return orders;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
            throw error;
        }
    }

    async createOrderDetail(orderDetailData) {
        try {
            const orderDetail = await OrderDetail.create(orderDetailData);
            return orderDetail;
        } catch (error) {
            console.error('Lỗi khi tạo chi tiết đơn hàng:', error);
            throw error;
        }
    }

    async updateOrderDetail(id, orderDetailData) {
        try {
            const orderDetail = await OrderDetail.findByPk(id);

            if (!orderDetail) {
                return null;
            }

            await orderDetail.update(orderDetailData);
            return orderDetail;
        } catch (error) {
            console.error('Lỗi khi cập nhật chi tiết đơn hàng:', error);
            throw error;
        }
    }

    async deleteOrderDetail(id) {
        try {
            const orderDetail = await OrderDetail.findByPk(id);

            if (!orderDetail) {
                return false;
            }

            await orderDetail.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa chi tiết đơn hàng:', error);
            throw error;
        }
    }
    async deleteAllOrderByOrderId(id) {
        try {
            const orderDetails = await OrderDetail.findAll({
                where: {
                    order_id: id
                }
            });
            if (!orderDetails || orderDetails.length === 0) {
                return false;
            }
            for (const orderDetailInstance of orderDetails) {
                await orderDetailInstance.destroy();
            }

            return true;
        } catch (error) {
            console.error('Lỗi khi xóa chi tiết đơn hàng:', error);
            throw error;
        }
    }
}

module.exports = new OrderDetailService();
