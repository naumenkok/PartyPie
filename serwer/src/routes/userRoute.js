const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/create', UserController.createUser);
router.get('/all', UserController.getAllUsers);
router.get('/userById/:userId', UserController.getUserById);
router.post('/login', UserController.getUserByLoginAndPassword);

module.exports = router;
