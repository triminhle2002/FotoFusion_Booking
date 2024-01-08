const express = require('express');
const router = express.Router();
const {
    createPayment,
    vnp_Return } = require('../controllers/payment_vnpay');

const { verifyToken, isAdminSystem, } = require('../middlewares/verifyToken')


router.post('/api/creatPayment', createPayment);
router.get('/api/vnpay_Return', vnp_Return);

module.exports = router;