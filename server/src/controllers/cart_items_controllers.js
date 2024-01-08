const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const CartItemService = require('../services/cart_items_services');

// Lấy danh sách tất cả các mục trong giỏ hàng
const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await CartItemService.getAllCartItems();
        res.json(cartItems);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách các mục trong giỏ hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách các mục trong giỏ hàng.' });
    }
};

// Lấy thông tin mục trong giỏ hàng bằng ID
const getCartItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const cartItem = await CartItemService.getCartItemById(id);
        if (!cartItem) {
            return res.status(404).json({ error: 'Không tìm thấy mục trong giỏ hàng.' });
        }

        res.json(cartItem);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin mục trong giỏ hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin mục trong giỏ hàng.' });
    }
};

// Tạo mục mới trong giỏ hàng
const createNewCartItem = async (req, res) => {
    try {
        // Lấy thông tin mục từ request body
        const { cart_id, prod_id, quantity, price } = req.body;
        const id = uuidv4(); // Tạo ID mới cho mục
        const cartItemData = { id, cart_id, prod_id, quantity, price };

        // Gọi service để tạo mục trong giỏ hàng
        const cartItem = await CartItemService.createCartItem(cartItemData);

        // Trả về thông tin mục vừa tạo
        res.status(201).json(cartItem);
    } catch (error) {
        console.error('Lỗi khi tạo mục mới trong giỏ hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo mục mới trong giỏ hàng.' });
    }
};
// Cập nhật thông tin mục trong giỏ hàng bằng ID
const updateCartItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const cartItemData = req.body;

        // Gọi service để cập nhật mục trong giỏ hàng
        const updatedCartItem = await CartItemService.updateCartItem(id, cartItemData);

        if (!updatedCartItem) {
            return res.status(404).json({ error: 'Mục trong giỏ hàng không tồn tại' });
        }

        res.json(updatedCartItem);
    } catch (error) {
        console.error('Lỗi khi cập nhật mục trong giỏ hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật mục trong giỏ hàng.' });
    }
};

// Xóa mục trong giỏ hàng bằng ID
const deleteCartItemById = async (req, res) => {
    try {
        const id = req.params.id;

        // Gọi service để xóa mục trong giỏ hàng
        const deleteResult = await CartItemService.deleteCartItem(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy mục trong giỏ hàng.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa mục trong giỏ hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa mục trong giỏ hàng.' });
    }
};

module.exports = {
    getAllCartItems,
    getCartItemById,
    createNewCartItem,
    updateCartItemById,
    deleteCartItemById
}