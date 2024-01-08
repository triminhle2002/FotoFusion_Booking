const { v4: uuidv4 } = require('uuid');
const VideoService = require('../services/video_services');

// Lấy danh sách tất cả video
const getAllVideos = async (req, res) => {
    try {
        const videos = await VideoService.getAllVideos();
        res.json(videos);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách video:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách video.' });
    }
};

// Lấy thông tin video bằng ID
const getVideoById = async (req, res) => {
    try {
        const id = req.params.id;
        const video = await VideoService.getVideoById(id);
        if (!video) {
            return res.status(404).json({ error: 'Không tìm thấy video.' });
        }

        res.json(video);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin video:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin video.' });
    }
};

// Tạo video mới
const createNewVideo = async (req, res) => {
    try {
        const inputData = req.body;
        const id = uuidv4();
        const videoData = { id, ...inputData };
        const video = await VideoService.createVideo(videoData);
        res.status(201).json(video);
    } catch (error) {
        console.error('Lỗi khi tạo ảnh mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo ảnh mới.' });
    }
};

// Cập nhật thông tin video bằng ID
const updateVideoById = async (req, res) => {
    try {
        const id = req.params.id;
        const videoData = req.body;
        const updatedVideo = await VideoService.updateVideo(id, videoData);

        if (!updatedVideo) {
            return res.status(404).json({ error: 'Video không tồn tại' });
        }

        res.json(updatedVideo);
    } catch (error) {
        console.error('Lỗi khi cập nhật video:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật video.' });
    }
};

// Xóa video bằng ID
const deleteVideoById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await VideoService.deleteVideo(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy video.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa video:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa video.' });
    }
};

module.exports = {
    getAllVideos,
    getVideoById,
    createNewVideo,
    updateVideoById,
    deleteVideoById
};
