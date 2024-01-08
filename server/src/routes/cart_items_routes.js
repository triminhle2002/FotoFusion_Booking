const express = require('express');
const router = express.Router();
const { getAllCartItems, getCartItemById, createNewCartItem, updateCartItemById, deleteCartItemById } = require('../controllers/cart_items_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')

// router.use(verifyToken)

// Định tuyến các yêu cầu liên quan đến các mục trong giỏ hàng (cart_items) tới controller
router.get('/api/getAllCartItems', verifyToken, getAllCartItems);
router.get('/api/getCartItemById/:id', verifyToken, getCartItemById);
router.post('/api/createNewCartItem', createNewCartItem);
router.put('/api/updateCartItemById/:id', verifyToken, updateCartItemById);
router.delete('/api/deleteCartItemById/:id', verifyToken, deleteCartItemById);

module.exports = router;
