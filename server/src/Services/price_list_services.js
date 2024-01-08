const PriceList = require('../models/price_list_models');
const { Op } = require('sequelize');
class PriceListService {
    async getPriceListById(id) {
        try {
            const priceList = await PriceList.findByPk(id);
            return priceList;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin bảng giá:', error);
            throw error;
        }
    }

    async getAllPriceLists() {
        try {
            const priceLists = await PriceList.findAll({
                where: {
                    photo_album_id: {
                        [Op.not]: '038057a3-668e-4b76-ade8-082cc984bb51',
                    },

                },
            });
            return priceLists;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách bảng giá:', error);
            throw error;
        }
    }

    async getAllPriceListByAlbumsId(albumId) {
        try {
            const priceLists = await PriceList.findAll({
                where: { photo_album_id: albumId },
                order: [['price', 'ASC']],
            });
            return priceLists;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách giá theo albumId:', error);
            throw error;
        }
    }
    async createPriceList(priceListData) {
        try {
            const priceList = await PriceList.create(priceListData);
            return priceList;
        } catch (error) {
            console.error('Lỗi khi tạo bảng giá:', error);
            throw error;
        }
    }

    async updatePriceList(id, priceListData) {
        try {
            const priceList = await PriceList.findByPk(id);

            if (!priceList) {
                return null;
            }

            await priceList.update(priceListData);
            return priceList;
        } catch (error) {
            console.error('Lỗi khi cập nhật bảng giá:', error);
            throw error;
        }
    }

    async deletePriceList(id) {
        try {
            const priceList = await PriceList.findByPk(id);

            if (!priceList) {
                return false;
            }

            await priceList.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa bảng giá:', error);
            throw error;
        }
    }
}

module.exports = new PriceListService();
