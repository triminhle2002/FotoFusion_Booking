const Product = require('../models/product_models');
const Photo = require('../models/photo_models');


class ProductService {
    async getProductById(id) {
        try {
            const product = await Product.findByPk(id);
            return product;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin sản phẩm:', error);
            throw error;
        }
    }

    async getAllProducts() {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        model: Photo,
                        as: 'photos', // This should match the alias used in the Photo model
                    },
                ],
            });
            return products;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách sản phẩm:', error);
            throw error;
        }
    }

    async createProduct(productData) {
        try {
            const product = await Product.create(productData);
            return product;
        } catch (error) {
            console.error('Lỗi khi tạo sản phẩm:', error);
            throw error;
        }
    }

    async updateProduct(id, productData) {
        try {
            const product = await Product.findByPk(id);

            if (!product) {
                return null;
            }

            await product.update(productData);
            return product;
        } catch (error) {
            console.error('Lỗi khi cập nhật sản phẩm:', error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const product = await Product.findByPk(id);

            if (!product) {
                return false;
            }

            await product.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            throw error;
        }
    }
}

module.exports = new ProductService();
