const { v4: uuidv4 } = require('uuid');
const VoucherService = require('../services/voucher_services');

// Lấy danh sách tất cả voucher
const getAllVouchers = async (req, res) => {
    try {
        const vouchers = await VoucherService.getAllVouchers();
        res.json(vouchers);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách voucher:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách voucher.' });
    }
};

// Lấy thông tin voucher bằng ID
const getVoucherById = async (req, res) => {
    try {
        const id = req.params.id;
        const voucher = await VoucherService.getVoucherById(id);
        if (!voucher) {
            return res.status(404).json({ error: 'Không tìm thấy voucher.' });
        }

        res.json(voucher);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin voucher:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin voucher.' });
    }
};

// Tạo voucher mới
const createNewVoucher = async (req, res) => {
    try {
        const { name, value, start_date, end_date } = req.body;
        const id = uuidv4();
        const voucherData = { id, name, value, start_date, end_date };
        const createdVoucher = await VoucherService.createVoucher(voucherData);
        res.status(201).json(createdVoucher);
    } catch (error) {
        console.error('Lỗi khi tạo voucher mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo voucher mới.' });
    }
};

// Cập nhật thông tin voucher bằng ID
const updateVoucherById = async (req, res) => {
    try {
        const id = req.params.id;
        const voucherData = req.body;
        const updatedVoucher = await VoucherService.updateVoucher(id, voucherData);

        if (!updatedVoucher) {
            return res.status(404).json({ error: 'Voucher không tồn tại' });
        }

        res.json(updatedVoucher);
    } catch (error) {
        console.error('Lỗi khi cập nhật voucher:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật voucher.' });
    }
};

// Xóa voucher bằng ID
const deleteVoucherById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await VoucherService.deleteVoucher(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy voucher.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa voucher:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa voucher.' });
    }
};

module.exports = {
    getAllVouchers,
    getVoucherById,
    createNewVoucher,
    updateVoucherById,
    deleteVoucherById
};
