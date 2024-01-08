const { v4: uuidv4 } = require('uuid');
const PhotoAlbumsService = require('../services/photo_albums_services');

// Lấy danh sách tất cả các album ảnh
const getAllPhotoAlbums = async (req, res) => {
    try {
        const photoAlbums = await PhotoAlbumsService.getAllPhotoAlbums();
        res.json(photoAlbums);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách album ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách album ảnh.' });
    }
};

// Lấy thông tin album ảnh bằng ID
const getPhotoAlbumById = async (req, res) => {
    try {
        const id = req.params.id;
        const photoAlbum = await PhotoAlbumsService.getPhotoAlbumById(id);
        if (!photoAlbum) {
            return res.status(404).json({ error: 'Không tìm thấy album ảnh.' });
        }

        res.json(photoAlbum);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin album ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin album ảnh.' });
    }
};
const getPhotoAlbumByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const photoAlbum = await PhotoAlbumsService.getPhotoAlbumByUserId(id);
        if (!photoAlbum) {
            return res.status(404).json({ error: 'Không tìm thấy album ảnh.' });
        }
        res.status(200).json(photoAlbum);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin album ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin album ảnh.' });
    }
};

// Tạo album ảnh mới
const createNewPhotoAlbum = async (req, res) => {
    try {
        const inputData = req.body;
        const id = uuidv4();
        const photoAlbumData = { id, ...inputData };
        const photoAlbum = await PhotoAlbumsService.createPhotoAlbum(photoAlbumData);
        res.status(201).json(photoAlbum);
    } catch (error) {
        console.error('Lỗi khi tạo album ảnh mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo album ảnh mới.' });
    }
};

// Cập nhật thông tin album ảnh bằng ID
const updatePhotoAlbumById = async (req, res) => {
    try {
        const id = req.params.id;
        const photoAlbumData = req.body;
        const updatedPhotoAlbum = await PhotoAlbumsService.updatePhotoAlbum(id, photoAlbumData);

        if (!updatedPhotoAlbum) {
            return res.status(404).json({ error: 'Album ảnh không tồn tại' });
        }

        res.json(updatedPhotoAlbum);
    } catch (error) {
        console.error('Lỗi khi cập nhật album ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật album ảnh.' });
    }
};

// Xóa album ảnh bằng ID
const deletePhotoAlbumById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await PhotoAlbumsService.deletePhotoAlbum(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy album ảnh.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa album ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa album ảnh.' });
    }
};

module.exports = {
    getAllPhotoAlbums,
    getPhotoAlbumById,
    createNewPhotoAlbum,
    updatePhotoAlbumById,
    deletePhotoAlbumById,
    getPhotoAlbumByUserId
};
