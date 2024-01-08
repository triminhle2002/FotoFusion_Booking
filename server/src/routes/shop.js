const express = require('express');
const router = express.Router();
const { getAllProductAndImg,
    addProductToCart,
    getAllCartByUser,
    getProducDetailstAndImg,
    updateCartItemQuantity,
    deleteProduct } = require('../controllers/shop');

const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')

router.get('/api/getAllProductAndImg', getAllProductAndImg);
router.post('/api/addProductToCart', verifyToken, addProductToCart);
router.get('/api/getAllCartByUser/:user_id', verifyToken, getAllCartByUser);
router.post('/api/getProductDetails', getProducDetailstAndImg);
router.delete('/api/deleteProductInCart/:user_id', verifyToken, deleteProduct);
router.put('/api/updateCartItemquantity/:id', verifyToken, updateCartItemQuantity);

module.exports = router;