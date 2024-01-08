const express = require('express');

const { v4: uuidv4 } = require('uuid');
const CostumeService = require('../services/costume_services');

// Lấy danh sách tất cả trang phục
const getAllCostumes = async (req, res) => {
    try {
        const costumes = await CostumeService.getAllCostumes();
        res.json(costumes);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách trang phục:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách trang phục.' });
    }
};
const getAllCategoryOfCostumes = async (req, res) => {
    try {
        const costumes = await CostumeService.getAllCategoryOfCostumes();
        res.json(costumes);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách trang phục:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách trang phục.' });
    }
};

// Lấy thông tin trang phục bằng ID
const getCostumeById = async (req, res) => {
    try {
        const id = req.params.id;
        const costume = await CostumeService.getCostumeById(id);
        if (!costume) {
            return res.status(404).json({ error: 'Không tìm thấy trang phục.' });
        }

        res.json(costume);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin trang phục:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin trang phục.' });
    }
};

// Tạo trang phục mới
const createNewCostume = async (req, res) => {
    try {
        const id = uuidv4();
        const inputData = req.body;
        const costumeData = { id, ...inputData };
        const costume = await CostumeService.createCostume(costumeData);
        res.status(201).json(costume);
    } catch (error) {
        console.error('Lỗi khi tạo trang phục mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo trang phục mới.' });
    }
};
// Cập nhật thông tin trang phục bằng ID
const updateCostumeById = async (req, res) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
        const costumeData = { ...inputData };
        const updatedCostume = await CostumeService.updateCostume(id, costumeData);

        if (!updatedCostume) {
            return res.status(404).json({ error: 'Trang phục không tồn tại' });
        }

        res.json(updatedCostume);
    } catch (error) {
        console.error('Lỗi khi cập nhật trang phục:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật trang phục.' });
    }
};

// Xóa trang phục bằng ID
const deleteCostumeById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await CostumeService.deleteCostume(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy trang phục.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa trang phục:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa trang phục.' });
    }
};
module.exports = {
    getAllCostumes,
    getCostumeById,
    createNewCostume,
    updateCostumeById,
    deleteCostumeById,
    getAllCategoryOfCostumes
}