const { v4: uuidv4 } = require('uuid');
const ProductService = require('../services/product_services');

// Lấy danh sách tất cả sản phẩm
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductService.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách sản phẩm.' });
    }
};

// Lấy thông tin sản phẩm bằng ID
const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductService.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm.' });
        }

        res.json(product);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin sản phẩm.' });
    }
};

// Tạo sản phẩm mới
const createNewProduct = async (req, res) => {
    try {
        const id = uuidv4();
        const inputData = req.body;
        const productData = { id, ...inputData };

        const product = await ProductService.createProduct(productData);
        res.status(201).json(product);
    } catch (error) {
        console.error('Lỗi khi tạo sản phẩm mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo sản phẩm mới.' });
    }
};

// Cập nhật thông tin sản phẩm bằng ID
const updateProductById = async (req, res) => {
    try {
        const id = req.params.id;

        const inputData = req.body;
        const productData = { id, ...inputData };
        const updatedProduct = await ProductService.updateProduct(id, productData);

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật sản phẩm.' });
    }
};

// Xóa sản phẩm bằng ID
const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await ProductService.deleteProduct(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa sản phẩm.' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createNewProduct,
    updateProductById,
    deleteProductById
};
