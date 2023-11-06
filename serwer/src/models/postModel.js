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
}

module.exports = Post;
