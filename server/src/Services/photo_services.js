const Photo = require('../models/photo_models');
const Product = require('../models/product_models');
const { Op } = require('sequelize');


class PhotoService {
    async getPhotoById(id) {
        try {
            const photo = await Photo.findByPk(id);
            return photo;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin ảnh:', error);
            throw error;
        }
    }


    async getAllPhotos() {
        try {
            const photos = await Photo.findAll();
            return photos;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách ảnh:', error);
            throw error;
        }
    }

    async createPhoto(photoData) {
        try {
            const photo = await Photo.create(photoData);
            return photo;
        } catch (error) {
            console.error('Lỗi khi tạo ảnh:', error);
            throw error;
        }
    }

    async updatePhoto(id, photoData) {
        try {
            const photo = await Photo.findByPk(id);

            if (!photo) {
                return null;
            }

            await photo.update(photoData);
            return photo;
        } catch (error) {
            console.error('Lỗi khi cập nhật ảnh:', error);
            throw error;
        }
    }

    //lấy tất cả hình ảnh theo albums id
    async getPhotosByAlbumId(albumId) {
        try {
            const photos = await Photo.findAll({
                where: { albums_id: albumId },
            });
            return photos;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách ảnh theo albumId:', error);
            throw error;
        }
    }
    //lấy tất cả hình ảnh theo blog id
    async getAllPhotosByBlogId(blog_id) {
        try {
            const photos = await Photo.findAll({
                where: { blog_id: blog_id },
            });
            return photos;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách ảnh theo albumId:', error);
            throw error;
        }
    }
    async getPhotosByProductId(prod_id) {
        try {
            const photos = await Photo.findAll({
                where: { prod_id: prod_id },
            });
            return photos;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách ảnh theo albumId:', error);
            throw error;
        }
    }
    //lấy tất cả hình ảnh theo costumer id
    async getPhotosByCostumerId(albumId) {
        try {
            const photos = await Photo.findOne({
                where: { costume_id: albumId },
            });
            return photos;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách ảnh theo albumId:', error);
            throw error;
        }
    }
    //lấy tất cả hình ảnh theo room id
    async getPhotosByRoomId(room_id) {
        try {
            const photos = await Photo.findOne({
                where: { room_id: room_id },
            });
            return photos;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách ảnh theo albumId:', error);
            throw error;
        }
    }
    //lấy tất cả hình ảnh theo room id
    async getPhotosByLocationsId(room_id) {
        try {
            const photos = await Photo.findOne({
                where: { locations_id: room_id },
            });
            return photos;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách ảnh theo albumId:', error);
            throw error;
        }
    }
    //lấy tất cả hình ảnh theo equipment id
    async getPhotosByEquipId(equip_id) {
        try {
            const photos = await Photo.findOne({
                where: { equip_id: equip_id },
            });
            return photos;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách ảnh theo albumId:', error);
            throw error;
        }
    }
    //lấy tất cả hình ảnh theo product id
    async getAllPhotosWithProductInfo() {
        try {
            const photos = await Photo.findAll({
                where: { prod_id: { [Op.not]: null } },
                include: [
                    {
                        model: Product,
                        as: 'product',
                    },
                ],
            });

            return photos;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách ảnh với thông tin sản phẩm:', error);
            throw error;
        }
    }
    //lấy tất cả hình ảnh theo event id
    async getAllPhotosByEventId(evenid) {
        try {
            const photos = await Photo.findAll({
                where: { event_id: evenid },
            });
            return photos;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách ảnh theo albumId:', error);
            throw error;
        }
    }
    //lấy tất cả hình ảnh theo user id
    async getAllPhotosByUserId(userid) {
        try {
            const photos = await Photo.findAll({
                where: { user_id: userid },
            });
            return photos;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách ảnh theo albumId:', error);
            throw error;
        }
    }
    //xóa hình ảnh theo id
    async deletePhoto(id) {
        try {
            const photo = await Photo.findByPk(id);

            if (!photo) {
                return false;
            }

            await photo.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa ảnh:', error);
            throw error;
        }
    }
    // Xóa hình ảnh theo costumer id
    async deleteFirstPhotoByCostumeId(costumeId) {
        try {
            // Tìm ảnh đầu tiên có costume_id bằng giá trị được cung cấp
            const photoToDelete = await Photo.findOne({
                where: {
                    costume_id: costumeId,
                },
            });

            if (!photoToDelete) {
                console.log('Không tìm thấy ảnh để xóa.');
                return false;
            }

            // Xóa ảnh
            await photoToDelete.destroy();
            console.log('Đã xóa ảnh đầu tiên thành công.');
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa ảnh:', error);
            throw error;
        }
    }
    //xóa hình ảnh theo quipment id
    async deletePhotoByEquipmentId(equipmentid) {
        try {
            // Tìm ảnh đầu tiên có costume_id bằng giá trị được cung cấp
            const photoToDelete = await Photo.findOne({
                where: {
                    equip_id: equipmentid,
                },
            });

            if (!photoToDelete) {
                console.log('Không tìm thấy ảnh để xóa.');
                return false;
            }

            // Xóa ảnh
            await photoToDelete.destroy();
            console.log('Đã xóa ảnh đầu tiên thành công.');
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa ảnh:', error);
            throw error;
        }
    }
    //xóa hình ảnh theo roomid

    async deletePhotoByRoomId(roomid) {
        try {
            // Tìm ảnh đầu tiên có costume_id bằng giá trị được cung cấp
            const photoToDelete = await Photo.findOne({
                where: {
                    room_id: roomid,
                },
            });

            if (!photoToDelete) {
                console.log('Không tìm thấy ảnh để xóa.');
                return false;
            }

            // Xóa ảnh
            await photoToDelete.destroy();
            console.log('Đã xóa ảnh đầu tiên thành công.');
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa ảnh:', error);
            throw error;
        }
    }
    //xóa hình ảnh theo location id
    async deletePhotoByLocationId(roomid) {
        try {
            // Tìm ảnh đầu tiên có costume_id bằng giá trị được cung cấp
            const photoToDelete = await Photo.findOne({
                where: {
                    locations_id: roomid,
                },
            });

            if (!photoToDelete) {
                console.log('Không tìm thấy ảnh để xóa.');
                return false;
            }
            // Xóa ảnh
            await photoToDelete.destroy();
            console.log('Đã xóa ảnh đầu tiên thành công.');
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa ảnh:', error);
            throw error;
        }
    }
    //xóa hình ảnh theo blog id
    async deletePhotoByBlogId(blog_id) {
        try {
            // Tìm ảnh đầu tiên có costume_id bằng giá trị được cung cấp
            const photoToDelete = await Photo.findAll({
                where: {
                    blog_id: blog_id,
                },
            });

            if (photoToDelete.length === 0) {
                console.log('Không tìm thấy ảnh để xóa.');
                return false;
            }

            // Xóa ảnh
            for (const photo of photoToDelete) {
                await photo.destroy();
            }
            console.log('Đã xóa ảnh đầu tiên thành công.');
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa ảnh:', error);
            throw error;
        }
    }
    //xóa tất cả hình ảnh theo userid
    async deletePhotoByUserid(userid) {
        try {
            // Tìm ảnh đầu tiên có costume_id bằng giá trị được cung cấp
            const photoToDelete = await Photo.findAll({
                where: {
                    user_id: userid,
                },
            });

            if (photoToDelete.length === 0) {
                console.log('Không tìm thấy ảnh để xóa.');
                return false;
            }

            // Xóa ảnh
            for (const photo of photosToDelete) {
                await photo.destroy();
            }
            console.log('Đã xóa ảnh đầu tiên thành công.');
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa ảnh:', error);
            throw error;
        }
    }
    // xóa tất cả hình ảnh theo albums_id
    async deletePhotoByAlbumsId(albumId) {
        try {
            // Tìm ảnh đầu tiên có costume_id bằng giá trị được cung cấp
            const photoToDelete = await Photo.findAll({
                where: {
                    albums_id: albumId,
                },
            });

            if (photoToDelete.length === 0) {
                console.log('Không tìm thấy ảnh để xóa.');
                return false;
            }

            // Xóa ảnh
            for (const photo of photosToDelete) {
                await photo.destroy();
            }
            console.log('Đã xóa ảnh đầu tiên thành công.');
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa ảnh:', error);
            throw error;
        }
    }
    // xóa tất cả hình ảnh theo even_id
    async deletePhotoByEventId(evenid) {
        try {
            // Tìm ảnh đầu tiên có costume_id bằng giá trị được cung cấp
            const photoToDelete = await Photo.findAll({
                where: {
                    event_id: evenid,
                },
            });

            if (photoToDelete.length === 0) {
                console.log('Không tìm thấy ảnh để xóa.');
                return false;
            }

            // Xóa ảnh
            for (const photo of photosToDelete) {
                await photo.destroy();
            }
            console.log('Đã xóa ảnh đầu tiên thành công.');
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa ảnh:', error);
            throw error;
        }
    }
    // xóa tất cả hình ảnh theo product_id
    async deletePhotoByProductId(id) {
        try {
            // Tìm ảnh đầu tiên có prod_id bằng giá trị được cung cấp
            const photosToDelete = await Photo.findAll({
                where: {
                    prod_id: id,
                },
            });
            if (photosToDelete.length === 0) {
                console.log('Không tìm thấy ảnh để xóa.');
                return false;
            }
            // Xóa ảnh
            for (const photoToDelete of photosToDelete) {
                await photoToDelete.destroy();
            }
            console.log('Đã xóa ảnh thành công.');
            return true;

        } catch (error) {
            console.error('Lỗi khi xóa ảnh:', error);
            throw error;
        }
    }

}

module.exports = new PhotoService();
