const PhotoAlbum = require('../models/photo_albums_models');

class PhotoAlbumService {
    async getPhotoAlbumById(id) {
        try {
            const photoAlbum = await PhotoAlbum.findByPk(id);
            return photoAlbum;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin album ảnh:', error);
            throw error;
        }
    }
    async getPhotoAlbumByUserId(id) {
        try {
            const photoAlbum = await PhotoAlbum.findOne({
                where: { user_id: id }
            });
            return photoAlbum;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin album ảnh:', error);
            throw error;
        }
    }

    async getAllPhotoAlbums() {
        try {
            const photoAlbums = await PhotoAlbum.findAll({
                order: [['date_create', 'ASC']],
            });

            return photoAlbums;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách album ảnh:', error);
            throw error;
        }
    }


    async createPhotoAlbum(photoAlbumData) {
        try {
            const photoAlbum = await PhotoAlbum.create(photoAlbumData);
            return photoAlbum;
        } catch (error) {
            console.error('Lỗi khi tạo album ảnh:', error);
            throw error;
        }
    }

    async updatePhotoAlbum(id, photoAlbumData) {
        try {
            const photoAlbum = await PhotoAlbum.findByPk(id);

            if (!photoAlbum) {
                return null;
            }

            await photoAlbum.update(photoAlbumData);
            return photoAlbum;
        } catch (error) {
            console.error('Lỗi khi cập nhật album ảnh:', error);
            throw error;
        }
    }

    async deletePhotoAlbum(id) {
        try {
            const photoAlbum = await PhotoAlbum.findByPk(id);

            if (!photoAlbum) {
                return false;
            }

            await photoAlbum.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa album ảnh:', error);
            throw error;
        }
    }
}

module.exports = new PhotoAlbumService();
