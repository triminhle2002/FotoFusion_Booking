const express = require('express');
const router = express.Router();
const { getAllBookingDetails, getBookingDetailById, createNewBookingDetail, updateBookingDetailById, deleteBookingDetailById, sendMailConfirmBooking, getBookingDetailByUserId } = require('../controllers/booking_details_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')

// router.use(verifyToken)
// Định tuyến các yêu cầu liên quan đến chi tiết đặt phòng tới controller
router.get('/api/getAllBookingDetails', verifyToken, isAdminSystem, getAllBookingDetails);
router.get('/api/getBookingDetailById/:id', verifyToken, getBookingDetailById);
router.get('/api/getBookingDetailByUserId/:id', verifyToken, getBookingDetailByUserId);

router.post('/api/createNewBookingDetail', verifyToken, createNewBookingDetail);
router.put('/api/updateBookingDetailById/:id', verifyToken, updateBookingDetailById);
router.delete('/api/deleteBookingDetailById/:id', verifyToken, isAdminSystem, deleteBookingDetailById);
router.post('/api/sendMailConfirmBooking', verifyToken, isAdminSystem, sendMailConfirmBooking);


module.exports = router;
