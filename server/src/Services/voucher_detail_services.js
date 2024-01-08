const VoucherDetail = require('../models/voucher_detail');
const Users = require('../models/users_models');
const Voucher = require('../models/voucher_models');

class VoucherDetailService {
    async getVoucherDetailById(id) {
        try {
            const voucherDetail = await VoucherDetail.findByPk(id, {
                include: [
                    { model: Users, as: 'user' },
                    { model: Voucher, as: 'voucher' },
                ],
            });
            return voucherDetail;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin chi tiết voucher:', error);
            throw error;
        }
    }

    async getAllVoucherDetails() {
        try {
            const voucherDetails = await VoucherDetail.findAll({
                include: [
                    { model: Users, as: 'user' },
                    { model: Voucher, as: 'voucher' },
                ],
            });
            return voucherDetails;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách chi tiết voucher:', error);
            throw error;
        }
    }

    async createVoucherDetail(voucherDetailData) {
        try {
            const voucherDetail = await VoucherDetail.create(voucherDetailData);
            return voucherDetail;
        } catch (error) {
            console.error('Lỗi khi tạo chi tiết voucher:', error);
            throw error;
        }
    }

    async updateVoucherDetail(id, voucherDetailData) {
        try {
            const voucherDetail = await VoucherDetail.findByPk(id);

            if (!voucherDetail) {
                return null;
            }

            await voucherDetail.update(voucherDetailData);
            return voucherDetail;
        } catch (error) {
            console.error('Lỗi khi cập nhật chi tiết voucher:', error);
            throw error;
        }
    }

    async deleteVoucherDetail(id) {
        try {
            const voucherDetail = await VoucherDetail.findByPk(id);

            if (!voucherDetail) {
                return false;
            }

            await voucherDetail.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa chi tiết voucher:', error);
            throw error;
        }
    }
}

module.exports = new VoucherDetailService();
