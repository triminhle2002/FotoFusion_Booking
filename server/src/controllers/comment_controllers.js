const express = require('express');


const { v4: uuidv4 } = require('uuid');
const CommentService = require('../services/comment_services');

// Lấy danh sách tất cả các bình luận
const getAllComments = async (req, res) => {
    try {
        const comments = await CommentService.getAllComments();
        res.json(comments);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách bình luận:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách bình luận.' });
    }
};

// Lấy thông tin bình luận bằng ID
const getCommentById = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await CommentService.getCommentById(id);
        if (!comment) {
            return res.status(404).json({ error: 'Không tìm thấy bình luận.' });
        }

        res.json(comment);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin bình luận:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin bình luận.' });
    }
};
// Lấy thông tin bình luận bằng ID
const getAllCommentsByBlogId = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await CommentService.getAllCommentsByBlogId(id);
        if (!comment) {
            return res.status(404).json({ error: 'Không tìm thấy bình luận.' });
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error('Lỗi khi lấy thông tin bình luận:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin bình luận.' });
    }
};
// Tạo bình luận mới
const createNewComment = async (req, res) => {
    try {
        const id = uuidv4();
        const inputData = req.body;
        const commentData = { id, ...inputData };

        // Gọi service để tạo bình luận
        const comment = await CommentService.createComment(commentData);

        // Trả về thông tin bình luận vừa tạo
        res.status(201).json(comment);
    } catch (error) {
        console.error('Lỗi khi tạo bình luận mới:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo bình luận mới.' });
    }
};

// Cập nhật thông tin bình luận bằng ID
const updateCommentById = async (req, res) => {
    try {
        const id = req.params.id;
        const commentData = req.body;

        // Gọi service để cập nhật bình luận
        const updatedComment = await CommentService.updateComment(id, commentData);

        if (!updatedComment) {
            return res.status(404).json({ error: 'Bình luận không tồn tại' });
        }

        res.json(updatedComment);
    } catch (error) {
        console.error('Lỗi khi cập nhật bình luận:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật bình luận.' });
    }
};

// Xóa bình luận bằng ID
const deleteCommentById = async (req, res) => {
    try {
        const id = req.params.id;

        // Gọi service để xóa bình luận
        const deleteResult = await CommentService.deleteComment(id);

        if (!deleteResult) {
            return res.status(404).json({ error: 'Không tìm thấy bình luận.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi xóa bình luận:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa bình luận.' });
    }
};

module.exports = {
    getAllComments,
    getCommentById,
    createNewComment,
    updateCommentById,
    deleteCommentById,
    getAllCommentsByBlogId
};
