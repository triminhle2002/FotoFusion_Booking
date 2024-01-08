const express = require('express');
const router = express.Router();
const {
    getAllNotifications,
    getNotificationById,
    createNewNotification,
    updateNotificationById,
    deleteNotificationById
} = require('../controllers/notification');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken');

router.get('/api/getAllNotifications', getAllNotifications);
router.get('/api/getNotificationById/:id', getNotificationById);
router.post('/api/createNewNotification', createNewNotification);
router.put('/api/updateNotificationById/:id', verifyToken, isAdminSystem, updateNotificationById);
router.delete('/api/deleteNotificationById/:id', verifyToken, isAdminSystem, deleteNotificationById);

module.exports = router;
