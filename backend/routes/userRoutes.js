const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');
const authorizeRole = require('../middleware/authorizeRole');
const router = express.Router();

router.get('/', authenticateToken, authorizeRole(['admin']), userController.getUsers);
router.put('/:id/role', authenticateToken, authorizeRole(['admin']), userController.updateUserRole);

module.exports = router;
