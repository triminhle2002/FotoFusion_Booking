const { v4: uuidv4 } = require('uuid');
const PhotographyRoomService = require('../services/photography_room_services');

// Lấy danh sách tất cả các phòng chụp ảnh
const getAllPhotographyRooms = async (req, res) => {
    try {
        const photographyRooms = await PhotographyRoomService.getAllPhotographyRooms();
        res.json(photographyRooms);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng chụp ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách phòng chụp ảnh.' });
    }
};
const getAllCategoryOfPhotographyRooms = async (req, res) => {
    try {
        const photographyRooms = await PhotographyRoomService.getAllCategoryOfRoom();
        res.json(photographyRooms);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng chụp ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách phòng chụp ảnh.' });
    }
};
// Lấy thông tin phòng chụp ảnh bằng ID
const getPhotographyRoomById = async (req, res) => {
    try {
        const id = req.params.id;
        const photographyRoom = await PhotographyRoomService.getPhotographyRoomById(id);
        if (!photographyRoom) {
            return res.status(404).json({ error: 'Không tìm thấy phòng chụp ảnh.' });
        }

        res.json(photographyRoom);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin phòng chụp ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin phòng chụp ảnh.' });
    }
};

// Tạo phòng chụp ảnh mới
const createNewPhotographyRoom = async (req, res) => {
    try {
        const id = uuidv4();
        const inputData = req.body;
        const photographyRoomData = { id, ...inputData };
        const photographyRoom = await PhotographyRoomService.createPhotographyRoom(photographyRoomData);
        res.status(201).json(photographyRoom);
    } catch (error) {
        console.error('Lỗi khi tạo phòng chụp ảnh mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo phòng chụp ảnh mới.' });
    }
};

// Cập nhật thông tin phòng chụp ảnh bằng ID
const updatePhotographyRoomById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const photographyRoomData = { ...inputData };
        const updatedPhotographyRoom = await PhotographyRoomService.updatePhotographyRoom(id, photographyRoomData);

        if (!updatedPhotographyRoom) {
            return res.status(404).json({ error: 'Phòng chụp ảnh không tồn tại' });
        }

        res.json(updatedPhotographyRoom);
    } catch (error) {
        console.error('Lỗi khi cập nhật phòng chụp ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật phòng chụp ảnh.' });
    }
};

// Xóa phòng chụp ảnh bằng ID
const deletePhotographyRoomById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await PhotographyRoomService.deletePhotographyRoom(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy phòng chụp ảnh.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa phòng chụp ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa phòng chụp ảnh.' });
    }
};

module.exports = {
    getAllPhotographyRooms,
    getPhotographyRoomById,
    createNewPhotographyRoom,
    updatePhotographyRoomById,
    deletePhotographyRoomById,
    getAllCategoryOfPhotographyRooms
};
