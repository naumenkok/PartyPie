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

    static getEventsByEventId(eventId, callback) {
        const query = "SELECT * FROM Events WHERE event_id = ?";
        connection.query(query, eventId, (err, data) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    static getEventIdByEventCode(eventCode, callback) {
        const query = "SELECT event_id FROM Events WHERE code = ?";
        connection.query(query, eventCode, (err, eventId) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, eventId);
            }
        });
    }

    static getLastEventId(callback) {
        const query = "SELECT MAX(event_id) AS last_event_id FROM Events";

        connection.query(query, (err, result) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                const lastEventId = result[0].last_event_id || 0;
                callback(null, lastEventId);
            }
        });
    }

    static generateRandomCode() {
        const codeLength = 5;
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = '';
        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            code += charset.charAt(randomIndex);
        }
        return code;
    }

    static isCodeUnique(code, callback) {
        const checkQuery = "SELECT COUNT(*) AS code_count FROM Events WHERE code = ?";
        connection.query(checkQuery, [code], (err, result) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(false);
            } else {
                const codeCount = result[0].code_count;
                callback(codeCount === 0);
            }
        });
    }

    static addEvent(eventData, callback) {
        this.getLastEventId((err, lastEventId) => {
            if (err) {
                callback(err, null);
                return;
            }
            const newEventId = lastEventId + 1;
            const insertEventWithUniqueCode = () => {
                const newCode = this.generateRandomCode();
                this.isCodeUnique(newCode, (isUnique) => {
                    if (isUnique) {
                        const insertQuery = "INSERT INTO Events (event_id, creator_id, name, type, date, code) VALUES (?, ?, ?, ?, ?, ?)";
                        const values = [newEventId, eventData.creator_id, eventData.name, eventData.type, eventData.date, newCode];

                        connection.query(insertQuery, values, (err, data) => {
                            if (err) {
                                console.error('Error in SQL query', err);
                                callback(err, null);
                            } else {
                                callback(null, data);
                            }
                        });
                    } else {
                        insertEventWithUniqueCode();
                    }
                });
            };
            insertEventWithUniqueCode();
        });
    }

    static deleteEventByEventId(eventId, callback) {
        const query = "DELETE FROM Events WHERE event_id = ?";
        connection.query(query, eventId, (err, result) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

module.exports = Event;
