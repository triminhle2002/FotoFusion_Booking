const express = require('express');
const router = express.Router();
const { getAllLocations, getLocationsById, deleteLocationsById, updateLocationsById, createNewLocations, getAllCategoryOfLocation } = require('../controllers/locations_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken');


// Không sử dụng middleware cho các route GET
router.get('/api/getAllLocations', getAllLocations);
router.get('/api/getAllCategoryOfLocation', getAllCategoryOfLocation);

router.get('/api/getLocationsById/:id', getLocationsById);

router.post('/api/createNewLocations', verifyToken, isAdminSystem, createNewLocations);
router.put('/api/updateLocationsById/:id', verifyToken, isAdminSystem, updateLocationsById);
router.delete('/api/deleteLocationsById/:id', verifyToken, isAdminSystem, deleteLocationsById);

module.exports = router;
