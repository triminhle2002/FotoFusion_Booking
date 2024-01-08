const Role = require('../models/roles_models');

class RoleService {
    async getRoleById(id) {
        try {
            const role = await Role.findOne({
                where: { id },
            });
            return role;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin tài khoản:', error);
            throw error;
        }
    }
    async getAllRoles() {
        try {
            const roles = await Role.findAll();
            return roles;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin tài khoản:', error);
            throw error;
        }
    }
    async createRole(RoleData) {
        try {
            const role = await Role.create(RoleData);
            return role;
        } catch (error) {
            console.error('Lỗi khi tạo tài khoản:', error);
            throw error;
        }
    }

    async updateRole(id, RoleData) {
        try {
            const role = await Role.findOne({
                where: { id },
            });

            if (!role) {
                return null;
            }

            await role.update(RoleData);
            return role;
        } catch (error) {
            console.error('Lỗi khi cập nhật tài khoản:', error);
            throw error;
        }
    }

    async deleteRole(id) {
        try {
            const role = await Role.findOne({
                where: { id },
            });

            if (!role) {
                return false;
            }

            await role.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa tài khoản:', error);
            throw error;
        }
    }
}

module.exports = new RoleService();