const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

router.get('/posts/:eventId', PostController.getMyEventsByUserId);

module.exports = router;
