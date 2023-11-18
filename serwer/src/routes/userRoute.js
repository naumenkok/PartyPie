const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/create', UserController.createUser);
router.get('/all', UserController.getAllUsers);
router.get('/userById', UserController.getUserById);
router.get('/usernameById/:userId', UserController.getUsernameById);
router.post('/login', UserController.getUserByLoginAndPassword);


module.exports = router;
