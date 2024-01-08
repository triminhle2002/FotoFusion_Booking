const express = require('express');
const { v4: uuidv4 } = require('uuid');
const CalendarService = require('../services/calendar_services');

// Lấy danh sách tất cả các mục trong calendar
const getAllCalendarItems = async (req, res) => {
    try {
        const calendarItems = await CalendarService.getAllCalendars();
        res.json(calendarItems);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách các mục trong calendar:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách các mục trong calendar.' });
    }
};

// Lấy thông tin mục trong calendar bằng ID
const getCalendarItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const calendarItem = await CalendarService.getCalendarById(id);
        if (!calendarItem) {
            return res.status(404).json({ error: 'Không tìm thấy mục trong calendar.' });
        }

        res.json(calendarItem);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin mục trong calendar:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin mục trong calendar.' });
    }
};

// Tạo một mục mới trong calendar
const createNewCalendarItem = async (req, res) => {
    try {
        const { calendar_id, prod_id, quantity, price } = req.body;
        const id = uuidv4();
        const calendarItemData = { id, calendar_id, prod_id, quantity, price };
        const calendarItem = await CalendarService.createCalendar(calendarItemData);

        res.status(201).json(calendarItem);
    } catch (error) {
        console.error('Lỗi khi tạo mục mới trong calendar:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo mục mới trong calendar.' });
    }
};

// Cập nhật thông tin mục trong calendar bằng ID
const updateCalendarItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const calendarItemData = req.body;
        const updatedCalendarItem = await CalendarService.updateCalendar(id, calendarItemData);

        if (!updatedCalendarItem) {
            return res.status(404).json({ error: 'Mục trong calendar không tồn tại' });
        }

        res.json(updatedCalendarItem);
    } catch (error) {
        console.error('Lỗi khi cập nhật mục trong calendar:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật mục trong calendar.' });
    }
};

// Xóa mục trong calendar bằng ID
const deleteCalendarItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteResult = await CalendarService.deleteCalendar(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy mục trong calendar.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa mục trong calendar:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa mục trong calendar.' });
    }
};

module.exports = {
    getAllCalendarItems,
    getCalendarItemById,
    createNewCalendarItem,
    updateCalendarItemById,
    deleteCalendarItemById
};
