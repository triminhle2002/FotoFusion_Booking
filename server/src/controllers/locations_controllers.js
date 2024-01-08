const { v4: uuidv4 } = require('uuid');
const LocationService = require('../services/locations_services');

// Lấy danh sách tất cả thiết bị
const getAllLocations = async (req, res) => {
    try {
        const locations = await LocationService.getAllLocation();
        res.json(locations);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách vị trí chụp hình:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách vị trí chụp hình.' });
    }
};
const getAllCategoryOfLocation = async (req, res) => {
    try {
        const photographyRooms = await LocationService.getAllCategoryOfLocation();
        res.json(photographyRooms);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng chụp ảnh:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách phòng chụp ảnh.' });
    }
};

// Lấy thông tin vị trí chụp hình bằng ID
const getLocationsById = async (req, res) => {
    try {
        const id = req.params.id;
        const locations = await LocationService.getLocationById(id);
        if (!locations) {
            return res.status(404).json({ error: 'Không tìm thấy vị trí chụp hình.' });
        }
        res.json(locations);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin vị trí chụp hình:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin vị trí chụp hình.' });
    }
};

// Tạo vị trí chụp hình mới
const createNewLocations = async (req, res) => {
    try {
        const id = uuidv4();
        const inputData = req.body;
        const locationsData = { id, ...inputData };
        const locations = await LocationService.createLocation(locationsData);
        res.status(201).json(locations);
    } catch (error) {
        console.error('Lỗi khi tạo vị trí chụp hình mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo vị trí chụp hình mới.' });
    }
};

// Cập nhật thông tin vị trí chụp hình bằng ID
const updateLocationsById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const locationsData = { ...inputData };
        const updatedlocations = await LocationService.updateLocation(id, locationsData);
        if (!updatedlocations) {
            return res.status(404).json({ error: 'vị trí chụp hình không tồn tại' });
        }

        res.json(updatedlocations);
    } catch (error) {
        console.error('Lỗi khi cập nhật vị trí chụp hình:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật vị trí chụp hình.' });
    }
};

// Xóa vị trí chụp hình bằng ID
const deleteLocationsById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await LocationService.deleteLocation(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy vị trí chụp hình.' });
        }
        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa vị trí chụp hình:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa vị trí chụp hình.' });
    }
};

module.exports = {
    getAllLocations,
    getLocationsById,
    deleteLocationsById,
    updateLocationsById,
    createNewLocations,
    getAllCategoryOfLocation
};
