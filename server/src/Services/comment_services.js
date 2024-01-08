const Comment = require('../models/comment_models');
const Users = require('../models/users_models')
class CommentService {
    async getCommentById(id) {
        try {
            const comment = await Comment.findByPk(id);
            return comment;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin bình luận:', error);
            throw error;
        }
    }

    async getAllComments() {
        try {
            const comments = await Comment.findAll();
            return comments;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách bình luận:', error);
            throw error;
        }
    }
    async getAllCommentsByBlogId(id) {
        try {
            const comments = await Comment.findAll({
                where: { blog_post_id: id },
                include: [
                    {
                        model: Users,
                        as: 'user',
                    },
                ],
            });
            return comments;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách bình luận:', error);
            throw error;
        }
    }

    async createComment(commentData) {
        try {
            const comment = await Comment.create(commentData);
            return comment;
        } catch (error) {
            console.error('Lỗi khi tạo bình luận:', error);
            throw error;
        }
    }

    async updateComment(id, commentData) {
        try {
            const comment = await Comment.findByPk(id);

            if (!comment) {
                return null;
            }

            await comment.update(commentData);
            return comment;
        } catch (error) {
            console.error('Lỗi khi cập nhật bình luận:', error);
            throw error;
        }
    }

    async deleteComment(id) {
        try {
            const comment = await Comment.findByPk(id);

            if (!comment) {
                return false;
            }

            await comment.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa bình luận:', error);
            throw error;
        }
    }
}

module.exports = new CommentService();
