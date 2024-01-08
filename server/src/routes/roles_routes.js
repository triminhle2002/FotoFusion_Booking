const express = require('express');
const router = express.Router();
const { getAllRoles,
    getRoleById,
    createNewRole,
    updateRoleById,
    deleteRoleById } = require('../controllers/roles_controllers');
const { verifyToken, isAdminSystem } = require('../middlewares/verifyToken')


// Định tuyến các yêu cầu tới controller
router.get('/api/getAllRoles', verifyToken, isAdminSystem, getAllRoles);
router.get('/api/getRoleById/:id', verifyToken, isAdminSystem, getRoleById);
router.post('/api/createRole', verifyToken, isAdminSystem, createNewRole);
router.put('/api/updateRole/:id', verifyToken, isAdminSystem, updateRoleById);
router.delete('/api/deleteRole/:id', verifyToken, isAdminSystem, deleteRoleById);

module.exports = router;
