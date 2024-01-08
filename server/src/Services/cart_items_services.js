const CartItem = require('../models/cart_items_models');

class CartItemService {
    async getCartItemById(id) {
        try {
            const cartItem = await CartItem.findByPk(id);
            return cartItem;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin mặt hàng trong giỏ hàng:', error);
            throw error;
        }
    }

    async getAllCartItems() {
        try {
            const cartItems = await CartItem.findAll();
            return cartItems;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách mặt hàng trong giỏ hàng:', error);
            throw error;
        }
    }

    async createCartItem(cartItemData) {
        try {
            const cartItem = await CartItem.create(cartItemData);
            return cartItem;
        } catch (error) {
            console.error('Lỗi khi thêm mặt hàng vào giỏ hàng:', error);
            throw error;
        }
    }

    async updateCartItem(id, cartItemData) {
        try {
            const cartItem = await CartItem.findByPk(id);

            if (!cartItem) {
                return null;
            }

            await cartItem.update(cartItemData);
            return cartItem;
        } catch (error) {
            console.error('Lỗi khi cập nhật mặt hàng trong giỏ hàng:', error);
            throw error;
        }
    }

    async deleteCartItem(id) {
        try {
            const cartItem = await CartItem.findByPk(id);

            if (!cartItem) {
                return false;
            }

            await cartItem.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa mặt hàng trong giỏ hàng:', error);
            throw error;
        }
    }
}

module.exports = new CartItemService();
