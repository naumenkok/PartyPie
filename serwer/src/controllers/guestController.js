const Guest = require('../models/guestModel');
const Event = require("../models/eventModel");


exports.getEventsByGuestId = (req, res) => {
    const userId = req.params.userId;

    Guest.getEventsByGuestId(userId, (err, events) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving events' });
        } else {
            res.status(200).json(events);
        }
    });
};


exports.getPastEventsByGuestId = (req, res) => {
    const userId = req.params.userId;

    Guest.getPastEventsByGuestId(userId, (err, events) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving past events' });
        } else {
            res.status(200).json(events);
        }
    });
};

exports.getFutureEventsByGuestId = (req, res) => {
    const userId = req.params.userId;

    Guest.getFutureEventsByGuestId(userId, (err, events) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving future events' });
        } else {
            res.status(200).json(events);
        }
    });
};