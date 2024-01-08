const express = require('express');
const router = express.Router();
const { getAllOrderDetails,
    getOrderDetailById,
    createNewOrderDetail,
    getOrderDetailByOrderId,
    deleteAllOrderByOrderId,
    updateOrderDetailById,
    deleteOrderDetailById } = require('../controllers/orders_details_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')


// Định tuyến các yêu cầu tới controller



//Admin
router.get('/api/getAllOrderDetails', verifyToken, getAllOrderDetails);
router.get('/api/getOrderDetailById/:id', verifyToken, isAdminSystem, getOrderDetailById);
router.delete('/api/deleteAllOrderByOrderId/:id', verifyToken, isAdminSystem, deleteAllOrderByOrderId);

router.get('/api/getOrderDetailByOrderId/:id', verifyToken, getOrderDetailByOrderId);
router.post('/api/createNewOrderDetail', verifyToken, createNewOrderDetail);

//router.put('/api/updateOrderDetailById/:id', verifyToken, isAdminSystem, updateOrderDetailById);
//router.delete('/api/deleteOrderDetailById/:id', verifyToken, isAdminSystem, deleteOrderDetailById);

module.exports = router;
