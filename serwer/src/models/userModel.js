// const mysql = require('mysql');
const db = require('../config');
const util = require("util");
// const connection = mysql.createConnection(db.database);
// const query = util.promisify(connection.query).bind(connection);

class User {
    constructor(connection) {
        this.connection = connection || require('mysql').createConnection(db.database);
        this.query = util.promisify(this.connection.query).bind(this.connection);
    }

    async createUser(name, surname, username, email, password) {
        try {
            const result = await this.query('SELECT MAX(user_id) AS max_id FROM Users');
            const lastUserId = result[0].max_id || 0;
            const nextUserId = lastUserId + 1;
            const insertQuery = 'INSERT INTO Users (user_id, name, surname, username, email, password) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [nextUserId, name, surname, username, email, password];

            await this.query(insertQuery, values);
            return nextUserId;
        } catch (err) {
            console.error('Error in SQL query', err);
            throw err;
        }
    }


    getUserById(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await this.query('SELECT * FROM Users WHERE user_id = ?', [userId]);
                resolve(user);
            } catch (err) {
                console.error('Error in SQL query', err);
                reject(err);
            }
        });
    }

    async getAllUsers() {
        try {
            const users = await this.query('SELECT * FROM Users');
            return users;
        } catch (err) {
            console.error('Error in SQL query', err);
            throw err;
        }
    }

    async getUserByLoginAndPassword(username, password) {
        try {
            const user = await this.query('SELECT user_id FROM Users WHERE username = ? AND password = ?', [username, password]);
            return user[0];
        } catch (err) {
            console.error('Error in SQL query', err);
            throw err;
        }
    }
}

module.exports = User;
