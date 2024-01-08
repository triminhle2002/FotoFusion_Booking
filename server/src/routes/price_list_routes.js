const express = require('express');
const router = express.Router();
const { getAllPriceLists,
    getPriceListById,
    createNewPriceList,
    updatePriceListById,
    deletePriceListById, getAllPriceListByAlbumsId } = require('../controllers/price_list_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')


// Định tuyến các yêu cầu tới controller
router.get('/api/getAllPriceLists', getAllPriceLists);
router.get('/api/getPriceListById/:id', getPriceListById);
router.post('/api/createPriceList', verifyToken, isAdminSystem, createNewPriceList);
router.put('/api/updatePriceList/:id', verifyToken, isAdminSystem, updatePriceListById);
router.delete('/api/deletePriceList/:id', verifyToken, isAdminSystem, deletePriceListById);
router.get('/api/getPriceListbyAlbumsid/:photo_album_id', getAllPriceListByAlbumsId);


module.exports = router;
