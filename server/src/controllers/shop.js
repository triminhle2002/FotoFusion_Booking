const StoreService = require('../Services/shop')
const User = require('../models/users_models');
const jwt = require('jsonwebtoken');

const getAllProductAndImg = async (req, res) => {
    try {

        const store = await StoreService.getProductsAndPhotos();

        res.status(200).json(store);


    } catch (error) {
        console.error('Lỗi khi lấy thông tin mặt hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin mặt hàng.' });
    }
};
const addProductToCart = async (req, res) => {
    try {

        const user_id = req.body.user_id
        const prod_id = req.body.prod_id;
        const quantity = req.body.quantity;

        const status = await StoreService.addProductToCart(prod_id, user_id, quantity);


        if (!status) {
            res.status(500).json({ error: 'Đã xảy ra lỗi thêm thông tin mặt hàng1.' });
        }
        res.status(200).json({ status: 'Thêm mặt hàng vào giỏ thành công' });

    } catch (error) {
        console.error('Lỗi khi thêm mặt hàng:', error);

        res.status(500).json({ error: 'Đã xảy ra lỗi thêm thông tin mặt hàng2.' });
    }
};
const getAllCartByUser = async (req, res) => {
    try {

        const user_id = req.params.user_id;
        const allproduct = await StoreService.getAllCartByUser(user_id);

        res.status(200).json(allproduct);
    } catch (error) {
        console.error('Lỗi khi lấy mặt hàng:', error);

        res.status(500).json({ error: 'Đã xảy ra lỗi lấy thông tin mặt hàng2.' });
    }
};
const updateCartItemQuantity = async (req, res) => {
    try {
        const id = req.params.id;
        const newQuantity = req.body.newQuantity;

        if (!id || !newQuantity) {
            return res.status(400).json({ error: 'Thiếu thông tin cần thiết.' });
        }

        const updatedCartItem = await StoreService.updateCartItemQuantity(id, newQuantity);

        if (updatedCartItem) {
            return res.status(200).json({ message: 'Cập nhật quantity thành công.', updatedCartItem });
        } else {
            return res.status(404).json({ error: 'CartItem không tồn tại.' });
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật quantity của cartItem:', error);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật quantity của cartItem.' });
    }
};
const getProducDetailstAndImg = async (req, res) => {
    try {
        const prod_id = req.body.prod_id;
        if (!prod_id) {
            res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin mặt hàng.' });

        } else {
            const store = await StoreService.getProductDetails(prod_id);

            res.status(200).json(store);
        }



    } catch (error) {
        console.error('Lỗi khi lấy thông tin mặt hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin mặt hàng.' });
    }

};
const deleteProduct = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const prod_id = req.query.prod_id; // Sử dụng req.query để lấy giá trị từ tham số trong URL

        if (!prod_id) {
            res.status(500).json({ error: 'Đã xảy ra lỗi không tìm thấy product' });
            return; // Dùng return để kết thúc hàm nếu có lỗi
        }

        const deleteProduct = await StoreService.deleteProductInCart(user_id, prod_id);

        res.status(200).json({ message: "delete successfully" });
    } catch (error) {
        console.error('Lỗi khi xoá mặt hàng:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi xoá mặt hàng.' });
    }
};
module.exports = {
    getAllProductAndImg,
    addProductToCart,
    getAllCartByUser,
    getProducDetailstAndImg,
    deleteProduct,
    updateCartItemQuantity
};