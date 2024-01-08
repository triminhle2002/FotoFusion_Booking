const express = require('express');
const router = express.Router();
const { getAllVideos,
    getVideoById,
    createNewVideo,
    updateVideoById,
    deleteVideoById } = require('../controllers/video_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')


// Định tuyến các yêu cầu tới controller
router.get('/api/getAllVideos', getAllVideos);
router.get('/api/getVideoById/:id', verifyToken, isAdminSystem, getVideoById);
router.post('/api/createVideo', verifyToken, isAdminSystem, createNewVideo);
router.put('/api/updateVideo/:id', verifyToken, isAdminSystem, updateVideoById);
router.delete('/api/deleteVideo/:id', verifyToken, isAdminSystem, deleteVideoById);

module.exports = router;
