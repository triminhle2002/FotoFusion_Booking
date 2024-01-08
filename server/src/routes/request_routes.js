const express = require('express');
const router = express.Router();
const { getAllRequests,
    getRequestById,
    createNewRequest,
    updateRequestById,
    deleteRequestById, getRequestByUserId } = require('../controllers/request_controllers');

const { verifyToken, isAdminSystem, isAdminOrEditorSystem } = require('../middlewares/verifyToken')


// Định tuyến các yêu cầu tới controller
router.get('/api/getAllRequests', verifyToken, isAdminOrEditorSystem, getAllRequests);
router.get('/api/getRequestById/:id', verifyToken, getRequestById);
router.get('/api/getRequestByUserId/:id', verifyToken, getRequestByUserId);

router.post('/api/createRequest', verifyToken, createNewRequest);
router.put('/api/updateRequest/:id', verifyToken, isAdminOrEditorSystem, updateRequestById);
router.delete('/api/deleteRequest/:id', verifyToken, deleteRequestById);

module.exports = router;
