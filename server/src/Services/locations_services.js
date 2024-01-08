const Location = require('../models/locations_models');
const Photo = require('../models/photo_models')
class LocationService {
    async getLocationById(id) {
        try {
            const location = await Location.findByPk(id);
            return location;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin thiết bị:', error);
            throw error;
        }
    }

    async getAllLocation() {
        try {
            const locationList = await Location.findAll();
            return locationList;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách thiết bị:', error);
            throw error;
        }
    }

    async createLocation(locationData) {
        try {
            const location = await Location.create(locationData);
            return location;
        } catch (error) {
            console.error('Lỗi khi tạo thiết bị:', error);
            throw error;
        }
    }

    async updateLocation(id, locationData) {
        try {
            const location = await Location.findByPk(id);

            if (!location) {
                return null;
            }

            await location.update(locationData);
            return location;
        } catch (error) {
            console.error('Lỗi khi cập nhật thiết bị:', error);
            throw error;
        }
    }

    async deleteLocation(id) {
        try {
            const location = await Location.findByPk(id);
            if (!location) {
                return false;
            }
            await location.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa thiết bị:', error);
            throw error;
        }
    }
    async getAllCategoryOfLocation() {
        try {
            // Use Sequelize's findAll method to retrieve only the 'category' field
            const rooms = await Location.findAll({
                attributes: ['type'],
            });

            // Consolidate categories to get a unique list
            const uniqueCategories = {};
            const consolidatedCategories = rooms.reduce((acc, room) => {
                const type = room.type;
                if (!uniqueCategories[type]) {
                    uniqueCategories[type] = true;
                    acc.push(type);
                }
                return acc;
            }, []);
            // Return the array of unique categories
            return consolidatedCategories;
        } catch (error) {
            // If an error occurs during the database query, log the error and rethrow it
            console.error('Lỗi khi lấy danh sách địa điểm :', error);
            throw error;
        }
    }
}

module.exports = new LocationService();
