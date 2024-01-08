const express = require('express');
const router = express.Router();
const { getAllOrders,
    getOrderById,
    createNewOrder,
    getOrderByUserId,
    updateOrderById,
    deleteOrderById } = require('../controllers/orders_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')


// Định tuyến các yêu cầu tới controller

//Admin

router.get('/api/getAllOrders', verifyToken, isAdminSystem, getAllOrders);
router.get('/api/getOrderById/:id', verifyToken, getOrderById);
router.get('/api/getOrderByUserId/:id', verifyToken, getOrderByUserId);

router.post('/api/createOrder', verifyToken, createNewOrder);
//router.put('/api/updateOrder/:id', verifyToken, isAdminSystem, updateOrderById);
router.delete('/api/deleteOrder/:id', verifyToken, deleteOrderById);

module.exports = router;
