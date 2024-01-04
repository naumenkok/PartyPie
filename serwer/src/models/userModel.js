const mysql = require('mysql');
const db = require('../config');
const util = require("util");
const connection = mysql.createConnection(db.database);
const query = util.promisify(connection.query).bind(connection);

class User {
    static async createUser(name, surname, username, email, password) {
        try {
            const result = await query('SELECT MAX(user_id) AS max_id FROM Users');
            const lastUserId = result[0].max_id || 0;
            const nextUserId = lastUserId + 1;
            const insertQuery = 'INSERT INTO Users (user_id, name, surname, username, email, password) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [nextUserId, name, surname, username, email, password];

            await query(insertQuery, values);
            return nextUserId;
        } catch (err) {
            console.error('Error in SQL query', err);
            throw err;
        }
    }


    static getUserById(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await query('SELECT * FROM Users WHERE user_id = ?', [userId]);
                resolve(user);
            } catch (err) {
                console.error('Error in SQL query', err);
                reject(err);
            }
        });
    }

    static async getAllUsers() {
        try {
            const users = await query('SELECT * FROM Users');
            return users;
        } catch (err) {
            console.error('Error in SQL query', err);
            throw err;
        }
    }

    static async getUserByLoginAndPassword(username, password) {
        try {
            const user = await query('SELECT user_id FROM Users WHERE username = ? AND password = ?', [username, password]);
            return user[0];
        } catch (err) {
            console.error('Error in SQL query', err);
            throw err;
        }
    }
}

module.exports = User;
