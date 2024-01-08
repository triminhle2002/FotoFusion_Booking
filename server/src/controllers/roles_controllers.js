const { v4: uuidv4 } = require('uuid');
const RoleService = require('../services/role_services');

// Lấy danh sách tất cả các vai trò
const getAllRoles = async (req, res) => {
    try {
        const roles = await RoleService.getAllRoles();
        res.json(roles);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách vai trò:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách vai trò.' });
    }
};

// Lấy thông tin vai trò bằng ID
const getRoleById = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await RoleService.getRoleById(id);
        if (!role) {
            return res.status(404).json({ error: 'Không tìm thấy vai trò.' });
        }

        res.json(role);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin vai trò:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin vai trò.' });
    }
};

// Tạo vai trò mới
const createNewRole = async (req, res) => {
    try {
        const { name } = req.body;
        const id = uuidv4();
        const roleData = { id, name };
        const createdRole = await RoleService.createRole(roleData);
        res.status(201).json(createdRole);
    } catch (error) {
        console.error('Lỗi khi tạo vai trò mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo vai trò mới.' });
    }
};

// Cập nhật thông tin vai trò bằng ID
const updateRoleById = async (req, res) => {
    try {
        const id = req.params.id;
        const roleData = req.body;
        const updatedRole = await RoleService.updateRole(id, roleData);

        if (!updatedRole) {
            return res.status(404).json({ error: 'Vai trò không tồn tại' });
        }

        res.json(updatedRole);
    } catch (error) {
        console.error('Lỗi khi cập nhật vai trò:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật vai trò.' });
    }
};

// Xóa vai trò bằng ID
const deleteRoleById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await RoleService.deleteRole(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy vai trò.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa vai trò:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa vai trò.' });
    }
};

module.exports = {
    getAllRoles,
    getRoleById,
    createNewRole,
    updateRoleById,
    deleteRoleById
};
