const express = require('express');
const router = express.Router();
const { getAllVideoAlbums,
    getVideoAlbumById,
    createNewVideoAlbum,
    updateVideoAlbumById,
    deleteVideoAlbumById } = require('../controllers/video_albums_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')


// Định tuyến các yêu cầu tới controller
router.get('/api/getAllVideoAlbums', getAllVideoAlbums);
router.get('/api/getVideoAlbumById/:id', getVideoAlbumById);

router.post('/api/createVideoAlbum', verifyToken, isAdminSystem, createNewVideoAlbum);
router.put('/api/updateVideoAlbum/:id', verifyToken, isAdminSystem, updateVideoAlbumById);
router.delete('/api/deleteVideoAlbum/:id', verifyToken, isAdminSystem, deleteVideoAlbumById);

module.exports = router;
