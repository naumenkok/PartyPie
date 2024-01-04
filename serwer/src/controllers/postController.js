const Post = require('../models/postModel');


exports.getAllPostsByEventId = (req, res) => {
    const eventId = req.params.eventId;

    Post.getAllPostsByEventId(eventId, (err, events) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving posts' });
        } else {
            res.status(200).json(events);
        }
    });
};

exports.getAllCommentsByPostId = (req, res) => {
    const postId = req.params.postId;

    Post.getAllCommentsByPostId(postId, (err, events) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving posts' });
        } else {
            res.status(200).json(events);
        }
    });
};

exports.addComment = (req, res) => {
    const postId = req.body.postId;
    const userId = req.body.userId;
    const text = req.body.text;
    const image = req.body.image || null;

    Post.addComment(postId, userId, text, image, (err, newCommentId) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error adding comment', details: err.message });
        } else {
            res.status(200).json({ comment_id: newCommentId });
        }
    });
};

exports.addPost = (req, res) => {
    const eventId = req.body.eventId;
    const userId = req.body.userId;
    const text = req.body.text;
    const image = req.body.image || null;

    Post.addPost(eventId, userId, text, image, (err, newPostId) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error adding post' });
        } else {
            res.status(200).json({ post_id: newPostId });
        }
    });
};

exports.deleteComment = (req, res) => {
    const commentId = req.params.commentId;

    Post.deleteComment(commentId, (err, result) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error deleting comment' });
        } else {
            res.status(200).json({ message: 'Comment deleted successfully' });
        }
    });
};

exports.deletePost = (req, res) => {
    const postId = req.params.postId;

    Post.deletePost(postId, (err, result) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error deleting post' });
        } else {
            res.status(200).json({ message: 'Post deleted successfully' });
        }
    });
};

