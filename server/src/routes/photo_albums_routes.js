const express = require('express');
const router = express.Router();
const { getAllPhotoAlbums,
    getPhotoAlbumById,
    createNewPhotoAlbum,
    updatePhotoAlbumById,
    getPhotoAlbumByUserId,
    deletePhotoAlbumById } = require('../controllers/photo_albums_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')


// Định tuyến các yêu cầu tới controller
router.get('/api/getAllPhotoAlbums', getAllPhotoAlbums);
router.get('/api/getPhotoAlbumById/:id', getPhotoAlbumById);
//Admin
router.post('/api/createPhotoAlbum', verifyToken, isAdminSystem, createNewPhotoAlbum);
router.put('/api/updatePhotoAlbum/:id', verifyToken, isAdminSystem, updatePhotoAlbumById);
router.get('/api/getPhotoAlbumByUserId/:id', verifyToken, getPhotoAlbumByUserId);

router.delete('/api/deletePhotoAlbum/:id', verifyToken, isAdminSystem, deletePhotoAlbumById);

module.exports = router;
