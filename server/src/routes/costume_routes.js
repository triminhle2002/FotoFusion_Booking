const express = require('express');
const router = express.Router();
const { getAllCostumes, getCostumeById, createNewCostume, updateCostumeById, deleteCostumeById, getAllCategoryOfCostumes } = require('../controllers/costume_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken');


// Không sử dụng middleware cho các route GET
router.get('/api/getAllCostumes', getAllCostumes);
router.get('/api/getAllCategoryOfCostumes', getAllCategoryOfCostumes);
router.get('/api/getCostumeById/:id', getCostumeById);

router.post('/api/createNewCostume', verifyToken, isAdminSystem, createNewCostume);
router.put('/api/updateCostumeById/:id', verifyToken, isAdminSystem, updateCostumeById);
router.delete('/api/deleteCostumeById/:id', verifyToken, isAdminSystem, deleteCostumeById);

module.exports = router;
