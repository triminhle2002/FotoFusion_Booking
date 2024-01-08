const express = require('express');
const router = express.Router();
const { getAllAccount, getAccountByEmail, createNewAccount, updateAccountByEmail, deleteAccountByEmail } = require('../controllers/account_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')

// Định tuyến các yêu cầu tài khoản tới controller

router.get('/api/getAllAccount', verifyToken, isAdminSystem, getAllAccount);
router.get('/api/getAccountByEmail/:email', verifyToken, getAccountByEmail);
router.post('/api/createNewAccount', verifyToken, isAdminSystem, createNewAccount);
router.put('/api/updateAccountByEmail/:email', verifyToken, updateAccountByEmail);
router.delete('/api/deleteAccountByEmail/:email', verifyToken, isAdminSystem, deleteAccountByEmail);

module.exports = router;