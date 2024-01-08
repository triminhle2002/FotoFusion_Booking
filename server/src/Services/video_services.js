const Video = require('../models/video_models');

class VideoService {
    async getVideoById(id) {
        try {
            const video = await Video.findByPk(id);
            return video;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin video:', error);
            throw error;
        }
    }

    async getAllVideos() {
        try {
            const videos = await Video.findAll();
            return videos;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách video:', error);
            throw error;
        }
    }

    async createVideo(videoData) {
        try {
            const video = await Video.create(videoData);
            return video;
        } catch (error) {
            console.error('Lỗi khi tạo video:', error);
            throw error;
        }
    }

    async updateVideo(id, videoData) {
        try {
            const video = await Video.findByPk(id);

            if (!video) {
                return null;
            }

            await video.update(videoData);
            return video;
        } catch (error) {
            console.error('Lỗi khi cập nhật video:', error);
            throw error;
        }
    }

    async deleteVideo(id) {
        try {
            const video = await Video.findByPk(id);

            if (!video) {
                return false;
            }

            await video.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa video:', error);
            throw error;
        }
    }
}

module.exports = new VideoService();
