const VideoAlbum = require('../models/video_albums_models');

class VideoAlbumService {
    async getVideoAlbumById(id) {
        try {
            const videoAlbum = await VideoAlbum.findByPk(id);
            return videoAlbum;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin album video:', error);
            throw error;
        }
    }

    async getAllVideoAlbums() {
        try {
            const videoAlbums = await VideoAlbum.findAll();
            return videoAlbums;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách album video:', error);
            throw error;
        }
    }

    async createVideoAlbum(videoAlbumData) {
        try {
            const videoAlbum = await VideoAlbum.create(videoAlbumData);
            return videoAlbum;
        } catch (error) {
            console.error('Lỗi khi tạo album video:', error);
            throw error;
        }
    }

    async updateVideoAlbum(id, videoAlbumData) {
        try {
            const videoAlbum = await VideoAlbum.findByPk(id);

            if (!videoAlbum) {
                return null;
            }

            await videoAlbum.update(videoAlbumData);
            return videoAlbum;
        } catch (error) {
            console.error('Lỗi khi cập nhật album video:', error);
            throw error;
        }
    }

    async deleteVideoAlbum(id) {
        try {
            const videoAlbum = await VideoAlbum.findByPk(id);

            if (!videoAlbum) {
                return false;
            }

            await videoAlbum.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa album video:', error);
            throw error;
        }
    }
}

module.exports = new VideoAlbumService();
