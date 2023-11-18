const mysql = require('mysql');
const db = require('../config');
const connection = mysql.createConnection(db.database);

class Post {
    static getAllPostsByEventId(eventId, callback) {
        const query = "SELECT * FROM Posts WHERE event_id = ? ORDER BY date DESC";
        connection.query(query, eventId, (err, posts) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, posts);
            }
        });
    }

    static getAllCommentsByPostId(postId, callback) {
        const query = "SELECT * FROM Comments WHERE post_id = ? ORDER BY date DESC";
        connection.query(query, postId, (err, comments) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, comments);
            }
        });
    }

    static addComment(postId, userId, text, callback) {
        const getLastCommentIdQuery = "SELECT MAX(comment_id) AS lastCommentId FROM Comments";
        connection.query(getLastCommentIdQuery, (err, result) => {
            if (err) {
                console.error('Error getting last comment_id:', err);
                callback(err, null);
            } else {
                const lastCommentId = result[0].lastCommentId || 0;
                const newCommentId = lastCommentId + 1;
                const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
                const insertCommentQuery = "INSERT INTO Comments (comment_id, post_id, user_id, text, date) VALUES (?, ?, ?, ?, ?)";
                connection.query(insertCommentQuery, [newCommentId, postId, userId, text, currentDate], (err, result) => {
                    if (err) {
                        console.error('Error adding comment:', err);
                        callback(err, null);
                    } else {
                        callback(null, newCommentId);
                    }
                });
            }
        });
    }

    static addPost(eventId, userId, text, callback) {
        const getLastPostIdQuery = "SELECT MAX(post_id) AS lastPostId FROM Posts";
        connection.query(getLastPostIdQuery, (err, result) => {
            if (err) {
                console.error('Error getting last post_id:', err);
                callback(err, null);
            } else {
                const lastPostId = result[0].lastPostId || 0;
                const newPostId = lastPostId + 1;
                const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
                const insertPostQuery = "INSERT INTO Posts (post_id, event_id, user_id, text, date) VALUES (?, ?, ?, ?, ?)";
                connection.query(insertPostQuery, [newPostId, eventId, userId, text, currentDate], (err, result) => {
                    if (err) {
                        console.error('Error adding post:', err);
                        callback(err, null);
                    } else {
                        console.error('added post:', result);
                        callback(null, newPostId);
                    }
                });
            }
        });
    }

    static deleteComment(commentId, callback) {
        const query = "DELETE FROM Comments WHERE comment_id = ?";
        connection.query(query, commentId, (err, result) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    static deletePost(postId, callback) {
        const query = "DELETE FROM Posts WHERE post_id = ?";
        connection.query(query, postId, (err, result) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

}

module.exports = Post;
