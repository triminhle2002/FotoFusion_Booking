const { v4: uuidv4 } = require('uuid');
const VideoAlbumService = require('../services/video_albums_services');

// Lấy danh sách tất cả video albums
const getAllVideoAlbums = async (req, res) => {
    try {
        const videoAlbums = await VideoAlbumService.getAllVideoAlbums();
        res.json(videoAlbums);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách video albums:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách video albums.' });
    }
};

// Lấy thông tin video album bằng ID
const getVideoAlbumById = async (req, res) => {
    try {
        const id = req.params.id;
        const videoAlbum = await VideoAlbumService.getVideoAlbumById(id);
        if (!videoAlbum) {
            return res.status(404).json({ error: 'Không tìm thấy video album.' });
        }

        res.json(videoAlbum);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin video album:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin video album.' });
    }
};

// Tạo video album mới
const createNewVideoAlbum = async (req, res) => {
    try {
        const inputData = req.body;
        const id = uuidv4();
        const videoAlbumData = { id, ...inputData };
        const createdVideoAlbum = await VideoAlbumService.createVideoAlbum(videoAlbumData);
        res.status(201).json(createdVideoAlbum);
    } catch (error) {
        console.error('Lỗi khi tạo video album mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo video album mới.' });
    }
};

// Cập nhật thông tin video album bằng ID
const updateVideoAlbumById = async (req, res) => {
    try {
        const id = req.params.id;
        const videoAlbumData = req.body;
        const updatedVideoAlbum = await VideoAlbumService.updateVideoAlbum(id, videoAlbumData);

        if (!updatedVideoAlbum) {
            return res.status(404).json({ error: 'Video album không tồn tại' });
        }

        res.json(updatedVideoAlbum);
    } catch (error) {
        console.error('Lỗi khi cập nhật video album:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật video album.' });
    }
};

// Xóa video album bằng ID
const deleteVideoAlbumById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await VideoAlbumService.deleteVideoAlbum(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy video album.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa video album:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa video album.' });
    }
};

module.exports = {
    getAllVideoAlbums,
    getVideoAlbumById,
    createNewVideoAlbum,
    updateVideoAlbumById,
    deleteVideoAlbumById
};
