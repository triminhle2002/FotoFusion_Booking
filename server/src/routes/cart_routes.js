const express = require('express');
const router = express.Router();
const { getCartByUserId,
    createNewCart,
    updateCartByUserId,
    deleteCartByUserId } = require('../controllers/cart_controllers');

// Định tuyến các yêu cầu liên quan đến đơn hàng (cart) tới controller
//router.get('/api/getAllCarts', getCartByUserId);
router.get('/api/getCartById/:id', getCartByUserId);
router.post('/api/createNewCart', createNewCart);
router.put('/api/updateCartById/:id', updateCartByUserId);
router.delete('/api/deleteCartById/:id', deleteCartByUserId);

module.exports = router;
