const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

router.get('/posts/:eventId', PostController.getAllPostsByEventId);
router.get('/comments/:postId', PostController.getAllCommentsByPostId);
router.post('/posts/add', PostController.addPost);
router.post('/comments/add', PostController.addComment);
router.delete('/posts/delete/:postId', PostController.deletePost);
router.delete('/comments/delete/:commentId', PostController.deleteComment);

module.exports = router;
