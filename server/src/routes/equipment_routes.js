const express = require('express');
const router = express.Router();
const { getAllEquipment, getEquipmentById, createNewEquipment, updateEquipmentById, deleteEquipmentById, getAllCategoryOfEquipment } = require('../controllers/equipment_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')


// Định tuyến các yêu cầu tới controller
router.get('/api/getAllEquipment', getAllEquipment);
router.get('/api/getAllCategoryOfEquipment', getAllCategoryOfEquipment);

router.get('/api/getEquipmentById/:id', getEquipmentById);
router.post('/api/createNewEquipment', verifyToken, isAdminSystem, createNewEquipment);
router.put('/api/updateEquipmentById/:id', verifyToken, isAdminSystem, updateEquipmentById);
router.delete('/api/deleteEquipmentById/:id', verifyToken, isAdminSystem, deleteEquipmentById);

module.exports = router;
