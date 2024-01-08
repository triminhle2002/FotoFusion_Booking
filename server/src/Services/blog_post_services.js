
const BlogPost = require('../models/blog_post_models');
class BlogPostService {
    async getBlogPostById(id) {
        try {
            const blogPost = await BlogPost.findByPk(id);
            return blogPost;
        } catch (error) {
            console.error('Lỗi khi lấy bài viết:', error);
            throw error;
        }
    }

    async getAllBlogPosts() {
        try {
            const blogPosts = await BlogPost.findAll();
            return blogPosts;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách bài viết:', error);
            throw error;
        }
    }

    async createBlogPost(blogPostData) {
        try {
            const blogPost = await BlogPost.create(blogPostData);
            return blogPost;
        } catch (error) {
            console.error('Lỗi khi tạo bài viết:', error);
            throw error;
        }
    }

    async updateBlogPost(id, blogPostData) {
        try {
            const blogPost = await BlogPost.findByPk(id);

            if (!blogPost) {
                return null;
            }

            await blogPost.update(blogPostData);
            return blogPost;
        } catch (error) {
            console.error('Lỗi khi cập nhật bài viết:', error);
            throw error;
        }
    }

    async deleteBlogPost(id) {
        try {
            const blogPost = await BlogPost.findByPk(id);

            if (!blogPost) {
                return false;
            }
            await blogPost.destroy();
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa bài viết:', error);
            throw error;
        }
    }
}

module.exports = new BlogPostService();