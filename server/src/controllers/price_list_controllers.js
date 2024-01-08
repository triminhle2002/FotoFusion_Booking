const { v4: uuidv4 } = require('uuid');
const PriceListService = require('../services/price_list_services');


// Lấy danh sách tất cả các bảng giá
const getAllPriceLists = async (req, res) => {
    try {
        const priceLists = await PriceListService.getAllPriceLists();
        res.json(priceLists);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách bảng giá:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách bảng giá.' });
    }
};
const getAllPriceListByAlbumsId = async (req, res) => {
    try {
        const photo_album_id = req.params.photo_album_id;
        console.log(photo_album_id);
        //const albumId = 'ef8440bc-e6b3-42e0-9c9b-b8c7366ce168'

        const data = await PriceListService.getAllPriceListByAlbumsId(photo_album_id);
        res.json(data);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách ảnh.' });
    }
};

// Lấy thông tin bảng giá bằng ID
const getPriceListById = async (req, res) => {
    try {
        const id = req.params.id;
        const priceList = await PriceListService.getPriceListById(id);
        if (!priceList) {
            return res.status(404).json({ error: 'Không tìm thấy bảng giá.' });
        }

        res.json(priceList);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin bảng giá:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin bảng giá.' });
    }
};

// Tạo bảng giá mới
const createNewPriceList = async (req, res) => {
    try {
        const id = uuidv4();
        const inputData = req.body;
        const priceListData = { id, ...inputData };

        const priceList = await PriceListService.createPriceList(priceListData);
        res.status(201).json(priceList);
    } catch (error) {
        console.error('Lỗi khi tạo bảng giá mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo bảng giá mới.' });
    }
};

// Cập nhật thông tin bảng giá bằng ID
const updatePriceListById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const priceListData = { id, ...inputData };
        const updatedPriceList = await PriceListService.updatePriceList(id, priceListData);

        if (!updatedPriceList) {
            return res.status(404).json({ error: 'Bảng giá không tồn tại' });
        }

        res.json(updatedPriceList);
    } catch (error) {
        console.error('Lỗi khi cập nhật bảng giá:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật bảng giá.' });
    }
};

// Xóa bảng giá bằng ID
const deletePriceListById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await PriceListService.deletePriceList(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy bảng giá.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa bảng giá:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa bảng giá.' });
    }
};

module.exports = {
    getAllPriceLists,
    getPriceListById,
    createNewPriceList,
    updatePriceListById,
    deletePriceListById,
    getAllPriceListByAlbumsId
};
