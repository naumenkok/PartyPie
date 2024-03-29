const mysql = require('mysql');
const db = require('../config');
const connection = mysql.createConnection(db.database);
const moment = require('moment-timezone');
moment.tz.setDefault('UTC');

class Event {
    static handleQueryError(err, callback) {
        console.error('Error in SQL query', err);
        callback(err, null);
    }

    static getPastMyEventsByUserId(userId, callback) {
        const currentDate = new Date();
        const query = "SELECT * FROM Events WHERE creator_id = ? AND date < ? ORDER BY date";
        connection.query(query, [userId, currentDate], (err, events) => {
            if (err) {
                this.handleQueryError(err, callback);
            } else {
                callback(null, events);
            }
        });
    }

    static getFutureMyEventsByUserId(userId, callback) {
        const currentDate = new Date();
        const query = "SELECT * FROM Events WHERE creator_id = ? AND date > ? ORDER BY date";
        connection.query(query, [userId, currentDate], (err, events) => {
            if (err) {
                this.handleQueryError(err, callback);
            } else {
                callback(null, events);
            }
        });
    }

    static getEventsByEventId(eventId, callback) {
        const query = "SELECT * FROM Events WHERE event_id = ?";
        connection.query(query, [eventId], (err, data) => {
            if (err) {
                this.handleQueryError(err, callback);
            } else {
                callback(null, data);
            }
        });
    }

    static getDaysUntilEvent(eventId) {
        return new Promise((resolve, reject) => {
            // moment.tz.setDefault('UTC');

            const query = "SELECT date FROM Events WHERE event_id = ?";
            connection.query(query, [eventId], (err, eventDate) => {
                if (err) {
                    this.handleQueryError(err, reject);
                } else {
                    const eventDateString = eventDate[0].date;
                    const currentDate = moment();
                    const eventDateMoment = moment(eventDateString, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
                    const currentDateStartOfDay = currentDate.clone().startOf('day');
                    const eventDateStartOfDay = eventDateMoment.clone().startOf('day');
                    const daysUntilEvent = eventDateStartOfDay.diff(currentDateStartOfDay, 'days');
                    resolve(daysUntilEvent);
                }
            });
        });
    }

    static getEventIdByEventCode(eventCode, callback) {
        console.log("you are here");
        console.log(eventCode);
        const query = "SELECT event_id FROM Events WHERE code = ?";
        connection.query(query, [eventCode], (err, eventId) => {
            if (err) {
                this.handleQueryError(err, callback);
            } else {
                console.log("you are here2", eventId);
                callback(null, eventId);
            }
        });
    }



    static getLastEventId(callback) {
        const query = "SELECT MAX(event_id) AS last_event_id FROM Events";

        connection.query(query, (err, result) => {
            if (err) {
                this.handleQueryError(err, callback);
            } else {
                const lastEventId = result[0].last_event_id || 0;
                callback(null, lastEventId);
            }
        });
    }

    static generateRandomCode() {
        const codeLength = 5;
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return Array.from({ length: codeLength }, () => charset.charAt(Math.floor(Math.random() * charset.length))).join('');
    }

    static isCodeUnique(code, callback) {
        const checkQuery = "SELECT COUNT(*) AS code_count FROM Events WHERE code = ?";
        connection.query(checkQuery, [code], (err, result) => {
            if (err) {
                this.handleQueryError(err, () => callback(false));
            } else {
                const codeCount = result[0].code_count;
                callback(codeCount === 0);
            }
        });
    }

    static addEvent(eventData, callback) {
        this.getLastEventId((err, lastEventId) => {
            if (err) {
                this.handleQueryError(err, callback);
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
                                this.handleQueryError(err, callback);
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
        connection.query(query, [eventId], (err, result) => {
            if (err) {
                this.handleQueryError(err, callback);
            } else {
                callback(null, result);
            }
        });
    }

    static updateEventName(eventId, newName, callback) {
        const query = "UPDATE Events SET name = ? WHERE event_id = ?";
        connection.query(query, [newName, eventId], (err, data) => {
            if (err) {
                this.handleQueryError(err, callback);
            } else {
                callback(null, data);
            }
        });
    }

    static updateEventPhotoLink(eventId, newLink, callback) {
        const query = "UPDATE Events SET photo_link = ? WHERE event_id = ?";
        connection.query(query, [newLink, eventId], (err, data) => {
            if (err) {
                this.handleQueryError(err, callback);
            } else {
                callback(null, data);
            }
        });
    }

    static updateEventInfo(eventId, country, city, street, house, date, callback) {
        const query = "UPDATE Events SET country = ?, city = ?, street = ?, house = ?, date = ? WHERE event_id = ?";
        connection.query(query, [country, city, street, house, date, eventId], (err, data) => {
            if (err) {
                this.handleQueryError(err, callback);
            } else {
                callback(null, data);
            }
        });
    }


    // static getMyEventsByUserId(userId, callback) {
    //     const query = "SELECT * FROM Events WHERE creator_id = ? ORDER BY date";
    //     connection.query(query, [userId], (err, events) => {
    //         if (err) {
    //             this.handleQueryError(err, callback);
    //         } else {
    //             callback(null, events);
    //         }
    //     });
    // }
}

module.exports = Event;
