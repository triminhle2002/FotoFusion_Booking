const express = require('express');
const router = express.Router();
const { getAllPromotionEvents,
    getPromotionEventById,
    createNewPromotionEvent,
    updatePromotionEventById,
    deletePromotionEventById } = require('../controllers/promotion_event_controllers');

const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')


// Định tuyến các yêu cầu tới controller
router.get('/api/getAllPromotionEvents', getAllPromotionEvents);
router.get('/api/getPromotionEventById/:id', getPromotionEventById);

//Admin
router.post('/api/createPromotionEvent', verifyToken, isAdminSystem, createNewPromotionEvent);
router.put('/api/updatePromotionEvent/:id', verifyToken, isAdminSystem, updatePromotionEventById);
router.delete('/api/deletePromotionEvent/:id', verifyToken, isAdminSystem, deletePromotionEventById);

module.exports = router;
