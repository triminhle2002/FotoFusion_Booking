const Cart = require('../models/cart_models');

class CartService {
    async getCartById(id) {
        try {
            const cart = await Cart.findByPk(id);
            return cart;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin giỏ hàng:', error);
            throw error;
        }
    }

    async getAllCarts() {
        try {
            const carts = await Cart.findAll();
            return carts;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách giỏ hàng:', error);
            throw error;
        }
    }

    async createCart(cartData) {
        try {
            const cart = await Cart.create(cartData);
            return cart;
        } catch (error) {
            console.error('Lỗi khi tạo giỏ hàng:', error);
            throw error;
        }
    }

    async updateCart(id, cartData) {
        try {
            const cart = await Cart.findByPk(id);

            if (!cart) {
                return null;
            }

            await cart.update(cartData);
            return cart;
        } catch (error) {
            console.error('Lỗi khi cập nhật giỏ hàng:', error);
            throw error;
        }
    }

    async deleteCart(id) {
        try {
            const cart = await Cart.findByPk(id);

            if (!cart) {
                return false;
            }

            await cart.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa giỏ hàng:', error);
            throw error;
        }
    }
}

module.exports = new CartService();
