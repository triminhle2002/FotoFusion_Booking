const express = require('express');

const { v4: uuidv4 } = require('uuid');
const CartService = require('../services/cart_services');




// Lấy thông tin giỏ hàng bằng id
const getCartByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await CartService.getCartByUserId(user_id);
        if (!cart) {
            return res.status(404).json({ error: 'Không tìm thấy giỏ hàng.' });
        }

        res.json(cart);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin giỏ hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin giỏ hàng.' });
    }
};

// Tạo giỏ hàng mới cho user
const createNewCart = async (req, res) => {
    try {
        const { user_id } = req.body;
        const id = uuidv4(); // Tạo ID mới cho giỏ hàng
        const cartData = { id, user_id, total_quantity: 0, total_price: 0 };

        const cart = await CartService.createCart(cartData);
        res.status(201).json(cart);
    } catch (error) {
        console.error('Lỗi khi tạo giỏ hàng mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo giỏ hàng mới.' });
    }
};

// Cập nhật thông tin giỏ hàng
const updateCartByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const cartData = req.body;
        const updatedCart = await CartService.updateCart(user_id, cartData);

        if (!updatedCart) {
            return res.status(404).json({ error: 'Giỏ hàng không tồn tại' });
        }

        res.json(updatedCart);
    } catch (error) {
        console.error('Lỗi khi cập nhật giỏ hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật giỏ hàng.' });
    }
};

// Xóa giỏ hàng bằng user_id
const deleteCartByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const deleteResult = await CartService.deleteCart(user_id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy giỏ hàng.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa giỏ hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa giỏ hàng.' });
    }
};

module.exports = {
    getCartByUserId,
    createNewCart,
    updateCartByUserId,
    deleteCartByUserId
};
