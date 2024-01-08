const Equipment = require('../models/equipment_models');

class EquipmentService {
    async getEquipmentById(id) {
        try {
            const equipment = await Equipment.findByPk(id);
            return equipment;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin thiết bị:', error);
            throw error;
        }
    }

    async getAllEquipment() {
        try {
            const equipmentList = await Equipment.findAll();
            return equipmentList;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách thiết bị:', error);
            throw error;
        }
    }

    async createEquipment(equipmentData) {
        try {
            const equipment = await Equipment.create(equipmentData);
            return equipment;
        } catch (error) {
            console.error('Lỗi khi tạo thiết bị:', error);
            throw error;
        }
    }

    async updateEquipment(id, equipmentData) {
        try {
            const equipment = await Equipment.findByPk(id);

            if (!equipment) {
                return null;
            }

            await equipment.update(equipmentData);
            return equipment;
        } catch (error) {
            console.error('Lỗi khi cập nhật thiết bị:', error);
            throw error;
        }
    }
    async getAllCategoryOfEquipment() {
        try {
            // Use Sequelize's findAll method to retrieve only the 'category' field
            const equipments = await Equipment.findAll({
                attributes: ['category'],
            });

            // Consolidate categories to get a unique list
            const uniqueCategories = {};
            const consolidatedCategories = equipments.reduce((acc, equipment) => {
                const category = equipment.category;
                if (!uniqueCategories[category]) {
                    uniqueCategories[category] = true;
                    acc.push(category);
                }
                return acc;
            }, []);
            // Return the array of unique categories
            return consolidatedCategories;
        } catch (error) {
            // If an error occurs during the database query, log the error and rethrow it
            console.error('Lỗi khi lấy danh sách thiết bị  :', error);
            throw error;
        }
    }
    async deleteEquipment(id) {
        try {
            const equipment = await Equipment.findByPk(id);

            if (!equipment) {
                return false;
            }

            await equipment.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa thiết bị:', error);
            throw error;
        }
    }
}

module.exports = new EquipmentService();
