const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateJWT, authorizeRoles } = require('../middlewares/auth.middleware');

// Protected routes
router.use(authenticateJWT);

router.get('/', authorizeRoles('admin'), userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', authorizeRoles('admin'), userController.deleteUser);

module.exports = router;
