const util = require('util');
const mysql = require('mysql');
const db = require('../config');
const Event = require('./eventModel');

class Guest {
    constructor(connection) {
        this.connection = connection || require('mysql').createConnection(db.database);
        this.query = util.promisify(this.connection.query).bind(this.connection);
    }
    async getEventsByGuestId(userId) {
        try {
            const query = "SELECT * FROM Guests WHERE guest_id = ?";
            const events = await this.query(query, [userId]);
            return events;
        } catch (err) {
            console.error('Error in SQL query', err);
            throw err;
        }
    }

    async getPastEventsByGuestId(userId) {
        try {
            const currentDate = new Date();
            const query = `
                SELECT Events.* 
                FROM Guests
                JOIN Events ON Guests.event_id = Events.event_id
                WHERE Guests.guest_id = ? AND Events.date < ? AND Guests.status = 'accepted'
                ORDER BY Events.date
            `;
            const events = await this.query(query, [userId, currentDate]);
            return events;
        } catch (err) {
            console.error('Error in SQL query', err);
            throw err;
        }
    }

    async getFutureEventsByGuestId(userId) {
        try {
            const currentDate = new Date();
            const query = `
                SELECT Events.* 
                FROM Guests
                JOIN Events ON Guests.event_id = Events.event_id
                WHERE Guests.guest_id = ? AND Events.date > ? AND Guests.status = 'accepted'
                ORDER BY Events.date
            `;
            const events = await this.query(query, [userId, currentDate]);
            return events;
        } catch (err) {
            console.error('Error in SQL query', err);
            throw err;
        }
    }

    static addGuest(userId, eventCode, callback) {
        Event.getEventIdByEventCode(eventCode, (err, eventId) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (eventId[0]){
                const query = "INSERT INTO Guests (guest_id, event_id, status) VALUES (?, ?, ?)";
                const status = "accepted";
                const eventIdNum = eventId[0].event_id;
                mysql.createConnection(db.database).query(query, [userId, eventIdNum, status], (err, data) => {
                    if (err) {
                        console.error('Error in SQL query', err);
                        callback(err, null);
                    } else {
                        callback(null, eventId[0]);
                    }
                });
            } else {
                callback(err, null);
                return;
            }
        });
    }

    async getGuestsByEventId(eventId) {
        const query = "SELECT G.guest_id, G.status, U.username FROM Guests G JOIN Users U ON G.guest_id = U.user_id WHERE G.event_id = ?";

        try {
            const data = await this.query(query, [eventId]);
            return data;
        } catch (err) {
            console.error('Error in SQL query', err);
            throw err;
        }
    }

}

module.exports = Guest;
