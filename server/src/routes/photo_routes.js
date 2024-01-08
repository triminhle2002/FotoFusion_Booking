const express = require('express');
const router = express.Router();
const { getAllPhotos, getPhotoById, createNewPhoto, updatePhotoById, deletePhotoById, getAllPhotosByLocationId, deletePhotoByLocationId,
    getAllPhotosByAlbumsId, getAllPhotosByCostumerId, getAllPhotosByProductId,
    getAllPhotosByBlogId, getAllPhotosByRoomId, getAllPhotosByEquipmentId, deletePhotoByCostumerId, getAllPhotosByEvenId, getAllPhotosByUserId,
    deletePhotoByEquipmentId, getAllPhotosByProductId1, deletePhotoByRoomId, deletePhotoByBlogId, deletePhotoByUserId, deletePhotoByAlbumId, deletePhotoByEventId, deletePhotoByProductId, }
    = require('../controllers/photo_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')


// Định tuyến các yêu cầu tới controller
router.get('/api/getAllPhotos', verifyToken, isAdminSystem, getAllPhotos);
router.get('/api/getPhotoById/:id', verifyToken, isAdminSystem, getPhotoById);
router.post('/api/createPhoto', verifyToken, isAdminSystem, createNewPhoto);
router.put('/api/updatePhoto/:id', verifyToken, isAdminSystem, updatePhotoById);
router.delete('/api/deletePhoto/:id', verifyToken, isAdminSystem, deletePhotoById);

router.get('/api/getAllPhotosByAlbumsId/:albums_id', getAllPhotosByAlbumsId);
router.get('/api/getAllPhotosByCostumerId/:costumer_id', getAllPhotosByCostumerId)
router.get('/api/getAllPhotosByRoomId/:room_id', getAllPhotosByRoomId)
router.get('/api/getAllPhotosByProductId1/:id', getAllPhotosByProductId1)

router.get('/api/getAllPhotosByProductId', getAllPhotosByProductId)
router.get('/api/getAllPhotosByBlogId/:blog_id', getAllPhotosByBlogId)
router.get('/api/getAllPhotosByEquipmentId/:equip_id', getAllPhotosByEquipmentId)
router.get('/api/getAllPhotosByEvenId/:event_id', getAllPhotosByEvenId)
router.get('/api/getAllPhotosByUserId/:user_id', getAllPhotosByUserId)
router.get('/api/getAllPhotosByLocationId/:locations_id', getAllPhotosByLocationId)



router.delete('/api/deletephotobycostumerid/:id', verifyToken, isAdminSystem, deletePhotoByCostumerId);
router.delete('/api/deletephotobyequipmentid/:id', verifyToken, isAdminSystem, deletePhotoByEquipmentId);
router.delete('/api/deletePhotoByRoomId/:id', verifyToken, isAdminSystem, deletePhotoByRoomId);
router.delete('/api/deletePhotoByBlogId/:id', verifyToken, isAdminSystem, deletePhotoByBlogId);
router.delete('/api/deletePhotoByUserId/:id', verifyToken, isAdminSystem, deletePhotoByUserId);
router.delete('/api/deletePhotoByAlbumId/:id', verifyToken, isAdminSystem, deletePhotoByAlbumId);
router.delete('/api/deletePhotoByEventId/:id', verifyToken, isAdminSystem, deletePhotoByEventId);

router.delete('/api/deletePhotoByProductId/:id', verifyToken, isAdminSystem, deletePhotoByProductId);
router.delete('/api/deletePhotoByLocationId/:id', verifyToken, isAdminSystem, deletePhotoByLocationId);






module.exports = router;
