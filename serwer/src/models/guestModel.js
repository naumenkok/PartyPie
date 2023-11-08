const mysql = require('mysql');
const db = require('../config');
const connection = mysql.createConnection(db.database);
const Event = require('./eventModel');

class Guest {
    static getEventsByGuestId(userId, callback) {
        const query = "SELECT * FROM Guests WHERE guest_id = ?";
        connection.query(query, [userId], (err, events) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, events);
            }
        });
    }

    static getPastEventsByGuestId(userId, callback) {
        const currentDate = new Date();
        const query = `
              SELECT Events.* 
              FROM Guests
              JOIN Events ON Guests.event_id = Events.event_id
              WHERE Guests.guest_id = ? AND Events.date < ? AND Guests.status = 'accepted'
            `;
        connection.query(query, [userId, currentDate], (err, events) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, events);
            }
        });
    }

    static getFutureEventsByGuestId(userId, callback) {
        const currentDate = new Date();
        const query = `
              SELECT Events.* 
              FROM Guests
              JOIN Events ON Guests.event_id = Events.event_id
              WHERE Guests.guest_id = ? AND Events.date > ? AND Guests.status = 'accepted'
            `;
        connection.query(query, [userId, currentDate], (err, events) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, events);
            }
        });
    }

    static addGuest(userId, eventCode, callback) {
        Event.getEventIdByEventCode(eventCode, (err, eventId) => {
            if (err) {
                callback(err, null);
                return;
            }
            const query = "INSERT INTO Guests (guest_id, event_id, status) VALUES (?, ?, ?)";
            const status = "accepted";
            const eventIdNum = eventId[0].event_id;
            connection.query(query, [userId, eventIdNum, status], (err, events) => {
                if (err) {
                    console.error('Error in SQL query', err);
                    callback(err, null);
                } else {
                    callback(null, events);
                }
            });
        });
    }


}

module.exports = Guest;
