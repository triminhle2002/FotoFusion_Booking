const Voucher = require('../models/voucher_models');

class VoucherService {
    async getVoucherById(id) {
        try {
            const voucher = await Voucher.findByPk(id);
            return voucher;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin voucher:', error);
            throw error;
        }
    }

    async getAllVouchers() {
        try {
            const vouchers = await Voucher.findAll();
            return vouchers;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách vouchers:', error);
            throw error;
        }
    }

    async createVoucher(voucherData) {
        try {
            const voucher = await Voucher.create(voucherData);
            return voucher;
        } catch (error) {
            console.error('Lỗi khi tạo voucher:', error);
            throw error;
        }
    }

    async updateVoucher(id, voucherData) {
        try {
            const voucher = await Voucher.findByPk(id);

            if (!voucher) {
                return null;
            }

            await voucher.update(voucherData);
            return voucher;
        } catch (error) {
            console.error('Lỗi khi cập nhật voucher:', error);
            throw error;
        }
    }

    async deleteVoucher(id) {
        try {
            const voucher = await Voucher.findByPk(id);

            if (!voucher) {
                return false;
            }

            await voucher.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa voucher:', error);
            throw error;
        }
    }
}

module.exports = new VoucherService();
