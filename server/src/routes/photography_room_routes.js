const express = require('express');
const router = express.Router();
const { getAllPhotographyRooms,
    getPhotographyRoomById,
    createNewPhotographyRoom,
    updatePhotographyRoomById,
    deletePhotographyRoomById, getAllCategoryOfPhotographyRooms } = require('../controllers/photography_room_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')


// Định tuyến các yêu cầu tới controller
router.get('/api/getAllPhotographyRooms', getAllPhotographyRooms);
router.get('/api/getAllCategoryOfPhotographyRooms', getAllCategoryOfPhotographyRooms);

router.get('/api/getPhotographyRoomById/:id', getPhotographyRoomById);

router.post('/api/createPhotographyRoom', verifyToken, isAdminSystem, createNewPhotographyRoom);
router.put('/api/updatePhotographyRoom/:id', verifyToken, isAdminSystem, updatePhotographyRoomById);
router.delete('/api/deletePhotographyRoom/:id', verifyToken, isAdminSystem, deletePhotographyRoomById);

module.exports = router;
