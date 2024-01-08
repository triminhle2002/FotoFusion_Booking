const express = require('express');
const router = express.Router();
const { getAllProducts,
    getProductById,
    createNewProduct,
    updateProductById,
    deleteProductById } = require('../controllers/product_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')


// Định tuyến các yêu cầu tới controller
router.get('/api/getAllProducts', getAllProducts);
router.get('/api/getProductById/:id', getProductById);

//Admin
router.post('/api/createProduct', verifyToken, isAdminSystem, createNewProduct);
router.put('/api/updateProduct/:id', verifyToken, isAdminSystem, updateProductById);
router.delete('/api/deleteProduct/:id', verifyToken, isAdminSystem, deleteProductById);

module.exports = router;
