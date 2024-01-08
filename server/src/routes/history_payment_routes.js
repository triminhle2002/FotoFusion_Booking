const express = require('express');
const router = express.Router();
const { getAllHistoryPayments, getHistoryPaymentById, createNewHistoryPayment, updateHistoryPaymentById, deleteHistoryPaymentById } = require('../controllers/history_payment_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')

// Định tuyến các yêu cầu tới controller



//admin
router.get('/api/getAllHistoryPayments', verifyToken, isAdminSystem, getAllHistoryPayments);
router.get('/api/getHistoryPaymentById/:id', verifyToken, isAdminSystem, getHistoryPaymentById);
router.post('/api/createNewHistoryPayment', verifyToken, isAdminSystem, createNewHistoryPayment);
router.put('/api/updateHistoryPaymentById/:id', verifyToken, isAdminSystem, updateHistoryPaymentById);
router.delete('/api/deleteHistoryPaymentById/:id', verifyToken, isAdminSystem, deleteHistoryPaymentById);

module.exports = router;
