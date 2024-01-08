const Request = require('../models/request_models');

class RequestService {
    async getRequestById(id) {
        try {
            const request = await Request.findByPk(id);
            return request;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin yêu cầu:', error);
            throw error;
        }
    }

    async getAllRequests() {
        try {
            const requests = await Request.findAll();
            return requests;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách yêu cầu:', error);
            throw error;
        }
    }
    async getAllRequestsByUserId(id) {
        try {
            const requests = await Request.findAll({
                where: {
                    user_id: id
                }
            });
            return requests;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách yêu cầu:', error);
            throw error;
        }
    }

    async createRequest(requestData) {
        try {
            const request = await Request.create(requestData);
            return request;
        } catch (error) {
            console.error('Lỗi khi tạo yêu cầu:', error);
            throw error;
        }
    }

    async updateRequest(id, requestData) {
        try {
            const request = await Request.findByPk(id);

            if (!request) {
                return null;
            }

            await request.update(requestData);
            return request;
        } catch (error) {
            console.error('Lỗi khi cập nhật yêu cầu:', error);
            throw error;
        }
    }

    async deleteRequest(id) {
        try {
            const request = await Request.findByPk(id);

            if (!request) {
                return false;
            }

            await request.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa yêu cầu:', error);
            throw error;
        }
    }
}

module.exports = new RequestService();
