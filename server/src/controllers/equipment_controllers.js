const { v4: uuidv4 } = require('uuid');
const EquipmentService = require('../services/equipment_services');

// Lấy danh sách tất cả thiết bị
const getAllEquipment = async (req, res) => {
    try {
        const equipment = await EquipmentService.getAllEquipment();
        res.json(equipment);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách thiết bị:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách thiết bị.' });
    }
};
const getAllCategoryOfEquipment = async (req, res) => {
    try {
        const equipments = await EquipmentService.getAllCategoryOfEquipment();
        res.json(equipments);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách trang phục:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách trang phục.' });
    }
};
// Lấy thông tin thiết bị bằng ID
const getEquipmentById = async (req, res) => {
    try {
        const id = req.params.id;
        const equipment = await EquipmentService.getEquipmentById(id);
        if (!equipment) {
            return res.status(404).json({ error: 'Không tìm thấy thiết bị.' });
        }

        res.json(equipment);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin thiết bị:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin thiết bị.' });
    }
};

// Tạo thiết bị mới
const createNewEquipment = async (req, res) => {
    try {
        const { name, category, price, quantity } = req.body;
        const id = uuidv4();
        const equipmentData = { id, name, category, price, quantity };
        const equipment = await EquipmentService.createEquipment(equipmentData);
        res.status(201).json(equipment);
    } catch (error) {
        console.error('Lỗi khi tạo thiết bị mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo thiết bị mới.' });
    }
};

// Cập nhật thông tin thiết bị bằng ID
const updateEquipmentById = async (req, res) => {
    try {
        const id = req.params.id;
        const equipmentData = req.body;
        const updatedEquipment = await EquipmentService.updateEquipment(id, equipmentData);

        if (!updatedEquipment) {
            return res.status(404).json({ error: 'Thiết bị không tồn tại' });
        }

        res.json(updatedEquipment);
    } catch (error) {
        console.error('Lỗi khi cập nhật thiết bị:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thiết bị.' });
    }
};

// Xóa thiết bị bằng ID
const deleteEquipmentById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await EquipmentService.deleteEquipment(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy thiết bị.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa thiết bị:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa thiết bị.' });
    }
};

module.exports = {
    getAllEquipment,
    getEquipmentById,
    createNewEquipment,
    updateEquipmentById,
    deleteEquipmentById,
    getAllCategoryOfEquipment
};
