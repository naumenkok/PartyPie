const mysql = require('mysql');
const db = require('../config');
const connection = mysql.createConnection(db.database);
const {BlobServiceClient} = require("@azure/storage-blob");
const crypto = require("crypto");
const util = require("util");

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

    getBlobClient(){
        const blobString = process.env.BLOB_STORAGE_STRING;
        if (!blobString) {
            console.error('no blob storage string!');
        }
        return BlobServiceClient.fromConnectionString(blobString);
    }

    async getAllCommentsByPostId(postId) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Comments WHERE post_id = ? ORDER BY date DESC";
            connection.query(query, [postId], (err, result) => {
                if (err) {
                    console.error('Error in getAllCommentsByPostId in SQL query', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async addComment(postId, userId, text, image) {
        try {
            const getLastCommentIdQuery = "SELECT MAX(comment_id) AS lastCommentId FROM Comments";
            const result = await new Promise((resolve, reject) => {
                connection.query(getLastCommentIdQuery, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            const lastCommentId = result[0].lastCommentId || 0;
            const newCommentId = lastCommentId + 1;
            const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

            let photoId = null;
            if (image) {
                photoId = crypto.randomBytes(16).toString("hex");
                console.log("type of: ", typeof photoId);
                const containerName = process.env.CONTAINERS_NAME;
                if (!containerName) {
                    console.error('no container name storage string!');
                    return;
                }

                const blobClient = this.getBlobClient();
                const containerClient = blobClient.getContainerClient(containerName);
                const blockBlobClient = containerClient.getBlockBlobClient(photoId);
                const uploadResponse = await blockBlobClient.upload(image, image.length);

                console.log(uploadResponse);

                if (uploadResponse.errorCode) {
                    console.error('error when uploading image to azure', uploadResponse.errorCode);
                    return; // Handle the error during image upload
                }
            }

            const insertCommentQuery = "INSERT INTO Comments (comment_id, post_id, user_id, text, date, image) VALUES (?, ?, ?, ?, ?, ?)";
            await new Promise((resolve, reject) => {
                connection.query(insertCommentQuery, [newCommentId, postId, userId, text, currentDate, photoId], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            return newCommentId;
        } catch (err) {
            console.error('Error in addComment in SQL query', err);
            throw err;
        }
    }

    static addPost(eventId, userId, text, image, callback) {
        const imageForDB = image ? JSON.stringify(image._data) : null;
        const getLastPostIdQuery = "SELECT MAX(post_id) AS lastPostId FROM Posts";
        connection.query(getLastPostIdQuery, (err, result) => {
            if (err) {
                console.error('Error getting last post_id:', err);
                callback(err, null);
            } else {
                const lastPostId = result[0].lastPostId || 0;
                const newPostId = lastPostId + 1;
                const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
                const insertPostQuery = "INSERT INTO Posts (post_id, event_id, user_id, text, date, image) VALUES (?, ?, ?, ?, ?, ?)";
                connection.query(insertPostQuery, [newPostId, eventId, userId, text, currentDate, imageForDB], (err, result) => {
                    if (err) {
                        console.error('Error adding post:', err);
                        callback(err, null);
                    } else {
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
