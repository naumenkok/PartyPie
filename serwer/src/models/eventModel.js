const mysql = require('mysql');
const db = require('../config');
const connection = mysql.createConnection(db.database);

class Event {
    static getMyEventsByUserId(userId, callback) {
        const query = "SELECT * FROM Events WHERE creator_id = ?";
        connection.query(query, [userId], (err, events) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, events);
            }
        });
    }

    static getPastMyEventsByUserId(userId, callback) {
        const currentDate = new Date();
        const query = "SELECT * FROM Events WHERE creator_id = ? AND date < ?";
        connection.query(query, [userId, currentDate], (err, events) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, events);
            }
        });
    }

    static getFutureMyEventsByUserId(userId, callback) {
        const currentDate = new Date();
        const query = "SELECT * FROM Events WHERE creator_id = ? AND date > ?";
        connection.query(query, [userId, currentDate], (err, events) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, events);
            }
        });
    }
}

module.exports = Event;
