const db = require('../config');
const moment = require('moment');
const mysql = require("mysql");
const connection = mysql.createConnection(db.database);
class Wishlist {
    static getWishlistByEventId(eventId, callback) {
        const query = "SELECT * FROM wishlist WHERE event_id = ?";
        connection.query(query, [eventId], (err, wishlist) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, wishlist);
            }
        });
    }

    static toggleStatusById(itemId, guestId, callback) {
        const query = "UPDATE wishlist SET status = IFNULL(status, false) XOR true WHERE wish_id = ?";
        connection.query(query, [itemId], (err, result) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err);
            } else {
                const updateGuestIdQuery = "UPDATE wishlist SET guest_id = ? WHERE wish_id = ?";
                connection.query(updateGuestIdQuery, [guestId, itemId], (err, result) => {
                    if (err) {
                        console.error('Error updating guest_id:', err);
                        callback(err);
                    } else {
                        callback(null);
                    }
                });
            }
        });
    }

    static updateWishlistItem(wishId, newName, newLink, callback) {
        const query = "UPDATE wishlist SET name = ?, link = ? WHERE wish_id = ?";
        connection.query(query, [newName, newLink, wishId], (err, result) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    static deleteWishlistItem(wishId, callback) {
        const query = "DELETE FROM wishlist WHERE wish_id = ?";
        connection.query(query, [wishId], (err, result) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    static addWish(eventId, name, link, callback) {

        const getLastWishIdQuery = "SELECT MAX(wish_id) AS lastWishId FROM wishlist";
        connection.query(getLastWishIdQuery, (err, result) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                const lastWishId = result[0].lastWishId || 0;
                const newWishId = lastWishId + 1;

                const insertQuery = "INSERT INTO wishlist (wish_id, event_id, name, link) VALUES (?, ?, ?, ?)";
                connection.query(insertQuery, [newWishId, eventId, name, link], (err, result) => {
                    if (err) {
                        console.error('Error in SQL query', err);
                        callback(err, null);
                    } else {
                        callback(null, result);
                    }
                });
            }
        });
    }

}

module.exports = Wishlist;
