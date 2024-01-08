const express = require('express');
const router = express.Router();
const { getAllBlogPosts, getBlogPostById, createNewBlogPost, updateBlogPostById, deleteBlogPostById } = require('../controllers/blog_post_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')


router.get('/api/getAllBlogPosts', getAllBlogPosts);
router.get('/api/getBlogPostById/:id', getBlogPostById);
router.post('/api/createNewBlogPost', verifyToken, isAdminSystem, createNewBlogPost);
router.put('/api/updateBlogPostById/:id', verifyToken, isAdminSystem, updateBlogPostById);
router.delete('/api/deleteBlogPostById/:id', verifyToken, isAdminSystem, deleteBlogPostById);

module.exports = router;