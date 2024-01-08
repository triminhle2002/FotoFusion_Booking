const PhotographyRoom = require('../models/photography_room_models');

class PhotographyRoomService {
    async getPhotographyRoomById(id) {
        try {
            const room = await PhotographyRoom.findByPk(id);
            return room;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin phòng chụp ảnh:', error);
            throw error;
        }
    }

    async getAllPhotographyRooms() {
        try {
            const rooms = await PhotographyRoom.findAll();
            return rooms;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách phòng chụp ảnh:', error);
            throw error;
        }
    }

    async createPhotographyRoom(roomData) {
        try {
            const room = await PhotographyRoom.create(roomData);
            return room;
        } catch (error) {
            console.error('Lỗi khi tạo phòng chụp ảnh:', error);
            throw error;
        }
    }

    async updatePhotographyRoom(id, roomData) {
        try {
            const room = await PhotographyRoom.findByPk(id);

            if (!room) {
                return null;
            }

            await room.update(roomData);
            return room;
        } catch (error) {
            console.error('Lỗi khi cập nhật phòng chụp ảnh:', error);
            throw error;
        }
    }
    async getAllCategoryOfRoom() {
        try {
            // Use Sequelize's findAll method to retrieve only the 'category' field
            const rooms = await PhotographyRoom.findAll({
                attributes: ['category'],
            });

            // Consolidate categories to get a unique list
            const uniqueCategories = {};
            const consolidatedCategories = rooms.reduce((acc, room) => {
                const category = room.category;
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
            console.error('Lỗi khi lấy danh sách phòng chụp :', error);
            throw error;
        }
    }
    async deletePhotographyRoom(id) {
        try {
            const room = await PhotographyRoom.findByPk(id);

            if (!room) {
                return false;
            }

            await room.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa phòng chụp ảnh:', error);
            throw error;
        }
    }
}

module.exports = new PhotographyRoomService();
