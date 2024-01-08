const express = require('express');
const router = express.Router();
const {
    getAllVoucherDetails,
    getVoucherDetailById,
    createNewVoucherDetail,
    updateVoucherDetailById,
    deleteVoucherDetailById
} = require('../controllers/voucher_detail');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken');

router.get('/api/getAllVoucherDetails', getAllVoucherDetails);
router.get('/api/getVoucherDetailById/:id', getVoucherDetailById);
router.post('/api/createNewVoucherDetail', verifyToken, createNewVoucherDetail);
router.put('/api/updateVoucherDetailById/:id', verifyToken, isAdminSystem, updateVoucherDetailById);
router.delete('/api/deleteVoucherDetailById/:id', verifyToken, isAdminSystem, deleteVoucherDetailById);

module.exports = router;
