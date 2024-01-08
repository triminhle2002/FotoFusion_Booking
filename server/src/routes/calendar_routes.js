const express = require('express');
const router = express.Router();
const { getAllCalendarItems,
    getCalendarItemById,
    createNewCalendarItem,
    updateCalendarItemById,
    deleteCalendarItemById } = require('../controllers/calendar_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')

// router.use(verifyToken)
// Định tuyến các yêu cầu liên quan đến lịch (calendar) tới controller
router.get('/api/getAllCalendars', verifyToken, getAllCalendarItems);
router.get('/api/getCalendarById/:id', verifyToken, getCalendarItemById);
router.post('/api/createNewCalendar', verifyToken, createNewCalendarItem);
router.put('/api/updateCalendarById/:id', verifyToken, isAdminSystem, updateCalendarItemById);
router.delete('/api/deleteCalendarById/:id', verifyToken, isAdminSystem, deleteCalendarItemById);

module.exports = router;
