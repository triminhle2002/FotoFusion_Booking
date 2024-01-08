const express = require('express');
const router = express.Router();
const { getAllVouchers,
    getVoucherById,
    createNewVoucher,
    updateVoucherById,
    deleteVoucherById } = require('../controllers/voucher_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')


// Định tuyến các yêu cầu tới controller
router.get('/api/getAllVouchers', getAllVouchers);
router.get('/api/getVoucherById/:id', getVoucherById);

router.post('/api/createVoucher', verifyToken, isAdminSystem, createNewVoucher);
router.put('/api/updateVoucher/:id', verifyToken, isAdminSystem, updateVoucherById);
router.delete('/api/deleteVoucher/:id', verifyToken, isAdminSystem, deleteVoucherById);

module.exports = router;
