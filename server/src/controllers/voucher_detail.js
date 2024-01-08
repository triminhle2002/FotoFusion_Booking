const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const VoucherDetailService = require('../services/voucher_detail_services');

// Lấy danh sách tất cả chi tiết voucher
const getAllVoucherDetails = async (req, res) => {
    try {
        const voucherDetails = await VoucherDetailService.getAllVoucherDetails();
        res.status(200).json(voucherDetails);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Lấy thông tin chi tiết voucher bằng ID
const getVoucherDetailById = async (req, res) => {
    try {
        const id = req.params.id;
        const voucherDetail = await VoucherDetailService.getVoucherDetailById(id);
        if (!voucherDetail) {
            return res.status(404).json({ error: 'Không tìm thấy chi tiết voucher.' });
        }

        res.json(voucherDetail);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin chi tiết voucher:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin chi tiết voucher.' });
    }
};

// Tạo chi tiết voucher mới
const createNewVoucherDetail = async (req, res) => {
    try {
        const inputData = req.body;
        const id = uuidv4();
        const voucherDetailData = { id, ...inputData };

        const voucherDetail = await VoucherDetailService.createVoucherDetail(voucherDetailData);
        res.status(201).json(voucherDetail);
    } catch (error) {
        console.error('Lỗi khi tạo chi tiết voucher mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo chi tiết voucher mới.' });
    }
};

// Cập nhật thông tin chi tiết voucher
const updateVoucherDetailById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const voucherDetailData = { ...inputData };

        const updatedVoucherDetail = await VoucherDetailService.updateVoucherDetail(id, voucherDetailData);
        if (!updatedVoucherDetail) {
            return res.status(404).json({ error: 'Chi tiết voucher không tồn tại' });
        }

        res.json(updatedVoucherDetail);
    } catch (error) {
        console.error('Lỗi khi cập nhật chi tiết voucher:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật chi tiết voucher.' });
    }
};

// Xóa chi tiết voucher
const deleteVoucherDetailById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await VoucherDetailService.deleteVoucherDetail(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy chi tiết voucher.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa chi tiết voucher:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa chi tiết voucher.' });
    }
};

module.exports = {
    getAllVoucherDetails,
    getVoucherDetailById,
    createNewVoucherDetail,
    updateVoucherDetailById,
    deleteVoucherDetailById
};
