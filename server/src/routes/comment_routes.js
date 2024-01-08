const express = require('express');
const router = express.Router();
const { getAllComments, getCommentById, createNewComment, updateCommentById, deleteCommentById, getAllCommentsByBlogId } = require('../controllers/comment_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')

// router.use(verifyToken)

// Định tuyến các yêu cầu tới controller
router.get('/api/getAllComments', getAllComments);
router.get('/api/getCommentById/:id', getCommentById);
router.post('/api/createNewComment', verifyToken, createNewComment);
router.put('/api/updateCommentById/:id', verifyToken, updateCommentById);
router.get('/api/getAllCommentsByBlogId/:id', getAllCommentsByBlogId);

router.delete('/api/deleteCommentById/:id', verifyToken, deleteCommentById);

module.exports = router;
