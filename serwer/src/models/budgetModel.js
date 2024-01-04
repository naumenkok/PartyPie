const mysql = require('mysql');
const db = require('../config');
const connection = mysql.createConnection(db.database);

class Budget {
    // static getTasksByEventId(eventId, callback) {
    //     const query = "SELECT * FROM tasks WHERE event_id = ?";
    //     connection.query(query, [eventId], (err, tasks) => {
    //         if (err) {
    //             console.error('Error in SQL query', err);
    //             callback(err, null);
    //         } else {
    //             callback(null, tasks);
    //         }
    //     });
    // }
}

module.exports = Budget;