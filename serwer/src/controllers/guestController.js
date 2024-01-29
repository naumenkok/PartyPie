const Guest = require('../models/guestModel');

exports.getEventsByGuestId = async (req, res) => {
    const userId = req.params.userId;
    const guestInstance = new Guest();

    try {
        const events = await guestInstance.getEventsByGuestId(userId);
        res.status(200).json(events);
    } catch (err) {
        console.error('Error in controller:', err);
        res.status(500).json({ error: 'Error retrieving events' });
    }
};

exports.getPastEventsByGuestId = async (req, res) => {
    const userId = req.params.userId;
    const guestInstance = new Guest();

    try {
        const events = await guestInstance.getPastEventsByGuestId(userId);
        res.status(200).json(events);
    } catch (err) {
        console.error('Error in controller:', err);
        res.status(500).json({ error: 'Error retrieving past events' });
    }
};

exports.getFutureEventsByGuestId = async (req, res) => {
    const userId = req.params.userId;
    const guestInstance = new Guest();

    try {
        const events = await guestInstance.getFutureEventsByGuestId(userId);
        res.status(200).json(events);
    } catch (err) {
        console.error('Error in controller:', err);
        res.status(500).json({ error: 'Error retrieving future events' });
    }
};

exports.addGuest = (req, res) => {
    const { user_id, code } = req.body;

    Guest.addGuest(user_id, code, (err, data) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error adding guest' });
        } else {
            res.status(201).json({ event_id: data });
        }
    });
};

exports.getGuestsByEventId = async (req, res) => {
    const eventId = req.params.eventId;
    const guestInstance = new Guest();

    try {
        const data = await guestInstance.getGuestsByEventId(eventId);
        res.status(200).json(data);
    } catch (err) {
        console.error('Error in controller:', err);
        res.status(500).json({ error: 'Error getting guests' });
    }
};
