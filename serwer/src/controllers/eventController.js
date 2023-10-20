const Event = require('../models/eventModel');


exports.getMyEventsByUserId = (req, res) => {
    const userId = req.params.userId;

    Event.getMyEventsByUserId(userId, (err, events) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving events' });
        } else {
            res.status(200).json(events);
        }
    });
};

exports.getPastMyEventsByUserId = (req, res) => {
    const userId = req.params.userId;

    Event.getPastMyEventsByUserId(userId, (err, events) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving past events' });
        } else {
            res.status(200).json(events);
        }
    });
};

exports.getFutureMyEventsByUserId = (req, res) => {
    const userId = req.params.userId;

    Event.getFutureMyEventsByUserId(userId, (err, events) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving future events' });
        } else {
            res.status(200).json(events);
        }
    });
};

