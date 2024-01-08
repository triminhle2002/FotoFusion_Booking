const Product = require('../models/product_models');
const Photos = require('../models/photo_models');
const Cart = require('../models/cart_models');
const CartItem = require('../models/cart_items_models');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/users_models');

Product.hasMany(Photos, { foreignKey: 'prod_id', as: 'photos' });
Photos.belongsTo(Product, { foreignKey: 'prod_id' });

Product.hasMany(CartItem, { foreignKey: 'prod_id' });
CartItem.belongsTo(Product, { foreignKey: 'prod_id' });
class StoreService {
    async getProductsAndPhotos() {
        try {
            const productsWithPhotos = await Product.findAll({
                include: [
                    {
                        model: Photos,
                        as: 'photos',
                        attributes: ['id', 'img_name', 'url_photo'],
                    },
                ],
            });
            return productsWithPhotos;

            // return JSON.stringify(productsWithPhotos, null, 2);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    }

    async addProductToCart(prod_id, user_id, quantity) {
        try {
            let cart = await Cart.findOne({
                where: { user_id: user_id },
            });

            if (!cart) {
                const id = uuidv4();
                cart = await Cart.create({ id: id, user_id: user_id, total_quantity: 0, total_price: 0 });
            }

            // Generate a unique id for the cart item
            const cartItemId = uuidv4();

            let cartItem = await CartItem.findOne({
                where: { cart_id: cart.id, prod_id: prod_id },
            });

            if (!cartItem) {
                const product = await Product.findByPk(prod_id);

                if (product) {
                    cartItem = await CartItem.create({
                        id: cartItemId, // Use the generated id for the cart item
                        cart_id: cart.id,
                        prod_id: prod_id,
                        quantity: quantity,
                        price: product.price,
                    });
                }
            } else {
                cartItem.quantity += quantity;
                await cartItem.save();
            }

            cart.total_quantity += quantity;
            cart.total_price += cartItem.price * quantity;
            await cart.save();

            return { message: 'Sản phẩm đã được thêm vào giỏ hàng.' };
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
            throw new Error('Đã xảy ra lỗi.');
        }
    };
    async getAllCartByUser(user_id) {
        try {
            const cart = await Cart.findOne({
                attributes: ['id'], // Chọn thuộc tính bạn muốn lấy (trong trường hợp này là 'id')
                where: {
                    user_id // Thay thế 'your_user_id' bằng giá trị user_id cụ thể
                },
            });
            const cart_id = cart.dataValues.id;
            console.log(cart_id);
            const cartItem = await CartItem.findAll({
                // attributes: ['id', 'quantity'],
                where: { cart_id }, // Thay thế 'your_cart_id' bằng giá trị cart_id cụ thể
                include: [
                    {
                        model: Product,
                        include: [
                            {
                                model: Photos,
                                as: 'photos',
                                attributes: ['id', 'img_name', 'url_photo'],
                            },
                        ],
                    },
                ],
            });
            return cartItem;

        } catch (error) {
            console.error('Lỗi:', error);
        }

    }
    async getProductDetails(prod_id) {
        try {
            const productsWithPhotos = await Product.findOne({
                where: { id: prod_id },
                include: [
                    {
                        model: Photos,
                        as: 'photos',
                        attributes: ['id', 'img_name', 'url_photo'],
                    },
                ],
            });
            return productsWithPhotos;

            // return JSON.stringify(productsWithPhotos, null, 2);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    }
    async deleteProductInCart(user_id, prod_id) {
        try {
            const cart = await Cart.findOne({
                where: {
                    user_id
                }
            })
            if (!cart) {
                return null;
            }
            const cart_id = cart.dataValues.id;
            CartItem.destroy({
                where: {
                    cart_id,
                    prod_id
                }
            })
                .then(() => {
                    console.log(`Mặt hàng với id ${cart_id} và ${prod_id}   đã được xoá thành công.`);
                })
                .catch((error) => {
                    console.error('Lỗi khi xoá mặt hàng:', error);
                });
        } catch (error) {
            console.error('Lỗi:', error);
        }
    }
    async updateCartItemQuantity(id, newQuantity) {
        try {
            const cartItem = await CartItem.findByPk(id);

            if (!cartItem) {
                console.error('CartItem không tồn tại.');
                return null;
            }

            // Update quantity của cartItem
            cartItem.quantity = newQuantity;
            await cartItem.save();
            console.log(`CartItem với id ${cartItem.id} đã được cập nhật quantity thành công.`);
            return cartItem;
        } catch (error) {
            console.error('Lỗi khi cập nhật quantity của cartItem:', error);
            throw new Error('Đã xảy ra lỗi khi cập nhật quantity của cartItem.');
        }
    }



    async deleteAllProductInCart(user_id) {
        try {
            const cart = await Cart.findOne({
                where: {
                    user_id
                }
            })
            if (!cart) {
                return null;
            }
            const cart_id = cart.dataValues.id;
            CartItem.destroy({
                where: {
                    cart_id
                }
            })
                .then(() => {
                    console.log(`Mặt hàng với id ${cart_id}  đã được xoá thành công.`);
                })
                .catch((error) => {
                    console.error('Lỗi khi xoá mặt hàng:', error);
                });
        } catch (error) {
            console.error('Lỗi:', error);
        }
    }

}

module.exports = new StoreService();