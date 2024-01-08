const { v4: uuidv4 } = require('uuid');
const PhotoService = require('../services/photo_services');

// Lấy danh sách tất cả các ảnh
const getAllPhotos = async (req, res) => {
    try {
        const photos = await PhotoService.getAllPhotos();
        res.json(photos);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách ảnh.' });
    }
};
// Lấy danh sách tất cả các ảnh theo albums id
const getAllPhotosByAlbumsId = async (req, res) => {
    try {
        const albums_id = req.params.albums_id;
        console.log(albums_id);
        //const albumId = 'ef8440bc-e6b3-42e0-9c9b-b8c7366ce168'

        const photos = await PhotoService.getPhotosByAlbumId(albums_id);
        res.json(photos);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách ảnh.' });
    }
};
// Lấy danh sách tất cả các ảnh theo costumer id
const getAllPhotosByCostumerId = async (req, res) => {
    try {
        const costumer_id = req.params.costumer_id;
        console.log(costumer_id);
        //const albumId = 'ef8440bc-e6b3-42e0-9c9b-b8c7366ce168'

        const photos = await PhotoService.getPhotosByCostumerId(costumer_id);
        res.json(photos);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách ảnh.' });
    }
};
// Lấy danh sách tất cả các ảnh theo equipment id
const getAllPhotosByEquipmentId = async (req, res) => {
    try {
        const equip_id = req.params.equip_id;
        console.log(equip_id);
        //const albumId = 'ef8440bc-e6b3-42e0-9c9b-b8c7366ce168'

        const photos = await PhotoService.getPhotosByEquipId(equip_id);
        res.json(photos);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách ảnh.' });
    }
};
// Lấy danh sách tất cả các ảnh theo roomid
const getAllPhotosByRoomId = async (req, res) => {
    try {
        const room_id = req.params.room_id;
        console.log(room_id);
        //const albumId = 'ef8440bc-e6b3-42e0-9c9b-b8c7366ce168'

        const photos = await PhotoService.getPhotosByRoomId(room_id);
        res.json(photos);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách ảnh.' });
    }
};
// Lấy danh sách tất cả các ảnh theo locationid
const getAllPhotosByLocationId = async (req, res) => {
    try {
        const room_id = req.params.locations_id;
        console.log(room_id);
        //const albumId = 'ef8440bc-e6b3-42e0-9c9b-b8c7366ce168'

        const photos = await PhotoService.getPhotosByLocationsId(room_id);
        res.json(photos);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách ảnh.' });
    }
};
// Lấy danh sách tất cả các ảnh theo product id
const getAllPhotosByProductId = async (req, res) => {
    try {
        // const prod_id = req.params.prod_id;
        // console.log(prod_id);
        //const albumId = 'ef8440bc-e6b3-42e0-9c9b-b8c7366ce168'

        const photos = await PhotoService.getAllPhotosWithProductInfo();
        res.json(photos);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách ảnh.' });
    }
};
const getAllPhotosByProductId1 = async (req, res) => {
    try {
        const prod_id = req.params.id;
        // console.log(prod_id);
        //const albumId = 'ef8440bc-e6b3-42e0-9c9b-b8c7366ce168'

        const photos = await PhotoService.getPhotosByProductId(prod_id);
        res.json(photos);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách ảnh.' });
    }
};
// Lấy danh sách tất cả các ảnh theo blog id
const getAllPhotosByBlogId = async (req, res) => {
    try {
        const blog_id = req.params.blog_id;
        console.log(blog_id);
        //const albumId = 'ef8440bc-e6b3-42e0-9c9b-b8c7366ce168'

        const photos = await PhotoService.getAllPhotosByBlogId(blog_id);
        res.json(photos);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách ảnh.' });
    }
};
// Lấy danh sách tất cả các ảnh theo event id
const getAllPhotosByEvenId = async (req, res) => {
    try {
        const event_id = req.params.event_id;
        console.log(event_id);
        //const albumId = 'ef8440bc-e6b3-42e0-9c9b-b8c7366ce168'

        const photos = await PhotoService.getAllPhotosByEventId(event_id);
        res.json(photos);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách ảnh.' });
    }
};
// Lấy danh sách tất cả các ảnh theo user id
const getAllPhotosByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        console.log(user_id);
        //const albumId = 'ef8440bc-e6b3-42e0-9c9b-b8c7366ce168'

        const photos = await PhotoService.getAllPhotosByUserId(user_id);
        res.json(photos);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách ảnh.' });
    }
};
// Lấy thông tin ảnh bằng ID
const getPhotoById = async (req, res) => {
    try {
        const id = req.params.id;
        const photo = await PhotoService.getPhotoById(id);
        if (!photo) {
            return res.status(404).json({ error: 'Không tìm thấy ảnh.' });
        }

        res.json(photo);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin ảnh.' });
    }
};

// Tạo ảnh mới
const createNewPhoto = async (req, res) => {
    try {
        const inputData = req.body;
        const id = uuidv4();
        const photoData = { id, ...inputData };
        const photo = await PhotoService.createPhoto(photoData);
        res.status(201).json(photo);
    } catch (error) {
        console.error('Lỗi khi tạo ảnh mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo ảnh mới.' });
    }
};

// Cập nhật thông tin ảnh bằng ID
const updatePhotoById = async (req, res) => {
    try {
        const id = req.params.id;
        const photoData = req.body;
        const updatedPhoto = await PhotoService.updatePhoto(id, photoData);

        if (!updatedPhoto) {
            return res.status(404).json({ error: 'Ảnh không tồn tại' });
        }

        res.status(201).json(updatedPhoto);
    } catch (error) {
        console.error('Lỗi khi cập nhật ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật ảnh.' });
    }
};

// Xóa ảnh bằng ID
const deletePhotoById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await PhotoService.deletePhoto(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy ảnh.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa ảnh.' });
    }
};
// Xóa ảnh bằng costumer ID
const deletePhotoByCostumerId = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await PhotoService.deleteFirstPhotoByCostumeId(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy ảnh.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa ảnh.' });
    }
};
// Xóa ảnh bằng equipment ID
const deletePhotoByEquipmentId = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await PhotoService.deletePhotoByEquipmentId(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy ảnh.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa ảnh.' });
    }
};
// Xóa ảnh bằng room ID
const deletePhotoByRoomId = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await PhotoService.deletePhotoByRoomId(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy ảnh.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa ảnh.' });
    }
};
// Xóa ảnh bằng room ID
const deletePhotoByLocationId = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await PhotoService.deletePhotoByLocationId(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy ảnh.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa ảnh.' });
    }
};
// Xóa ảnh bằng blog ID
const deletePhotoByBlogId = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await PhotoService.deletePhotoByBlogId(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy ảnh.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa ảnh.' });
    }
};
// Xóa ảnh bằng user ID
const deletePhotoByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await PhotoService.deletePhotoByUserid(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy ảnh.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa ảnh.' });
    }
};
// Xóa ảnh bằng albums ID
const deletePhotoByAlbumId = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await PhotoService.deletePhotoByAlbumsId(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy ảnh.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa ảnh.' });
    }
};
// Xóa ảnh bằng event ID
const deletePhotoByEventId = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await PhotoService.deletePhotoByEventId(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy ảnh.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa ảnh.' });
    }
};
// Xóa ảnh bằng product ID
const deletePhotoByProductId = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await PhotoService.deletePhotoByProductId(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy ảnh.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa ảnh.' });
    }
};
module.exports = {
    getAllPhotos, getPhotoById, createNewPhoto,
    updatePhotoById, deletePhotoById, getAllPhotosByProductId1,
    getAllPhotosByAlbumsId, getAllPhotosByCostumerId, getAllPhotosByRoomId, getAllPhotosByProductId,
    getAllPhotosByBlogId, getAllPhotosByEquipmentId, getAllPhotosByEvenId, getAllPhotosByUserId,
    deletePhotoByCostumerId, deletePhotoByEquipmentId, deletePhotoByRoomId, deletePhotoByBlogId, deletePhotoByLocationId,
    deletePhotoByUserId, deletePhotoByAlbumId, deletePhotoByEventId, deletePhotoByProductId, getAllPhotosByLocationId

};
