const mysql = require('mysql');
const db = require('../config');
const connection = mysql.createConnection(db.database);

class User {
    static createUser(newUser, callback) {
        connection.query("SELECT MAX(user_id) AS max_id FROM Users", (err, result) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                const lastUserId = result[0].max_id || 0;
                const nextUserId = lastUserId + 1;
                const query = "INSERT INTO Users (user_id, name, surname, username, email, password) VALUES (?, ?, ?, ?, ?, ?)";
                const values = [nextUserId, newUser.name, newUser.surname, newUser.username, newUser.email, newUser.password];

                connection.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Error in SQL query', err);
                        callback(err, null);
                    } else {
                        callback(null, nextUserId);
                    }
                });
            }
        });
    }

    static getUserById(userId, callback) {
        connection.query('SELECT * FROM Users WHERE user_id = ?', [userId], callback);
    }

    static getUsernameById(userId, callback) {
        connection.query('SELECT username FROM Users WHERE user_id = ?', [userId], callback);
    }

    static getAllUsers(callback) {
        const query = "SELECT * FROM Users";
        connection.query(query, (err, users) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, users);
            }
        });
    }

    static getUserByLoginAndPassword(username, password, callback) {
        const query = "SELECT user_id FROM Users WHERE username = ? AND password = ?";

        connection.query(query, [username, password], (err, user) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, user[0]);
            }
        });
    }
}

module.exports = User;
