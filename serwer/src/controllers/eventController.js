const Event = require('../models/eventModel');
//
// exports.getMyEventsByUserId = (req, res) => {
//     const userId = req.params.userId;
//
//     Event.getMyEventsByUserId(userId, (err, events) => {
//         if (err) {
//             console.error('Error in controller:', err);
//             res.status(500).json({ error: 'Error retrieving events' });
//         } else {
//             res.status(200).json(events);
//         }
//     });
// };

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

exports.getEventsByEventId = (req, res) => {
    const eventId = req.params.eventId;

    Event.getEventsByEventId(eventId, (err, data) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving events data' });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.addEvent = (req, res) => {
    const eventData = {
        creator_id: req.body.creator_id,
        name: req.body.name,
        type: req.body.type,
        date: req.body.date
    };

    Event.addEvent(eventData, (err, data) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error adding event' });
        } else {
            res.status(201).json({ message: 'Event added successfully' });
        }
    });
};

exports.deleteEventByEventId = (req, res) => {
    const eventId = req.params.eventId;

    Event.deleteEventByEventId(eventId, (err, data) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error deleting the event' });
        } else {
            res.status(200).json({ message: 'Event deleted successfully' });
        }
    });
};

exports.getDaysUntilEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const daysUntilEvent = await Event.getDaysUntilEvent(eventId);
        res.status(200).json(daysUntilEvent);
    } catch (err) {
        console.error('Error in controller:', err);
        res.status(500).json({ error: 'Error retrieving days until event' });
    }
};

exports.updateEventName = (req, res) => {
    const eventId = req.body.eventId;
    const newName = req.body.newName;

    Event.updateEventName(eventId, newName, (err, data) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error updating event name' });
        } else {
            res.status(200).json({ message: 'Event name updated successfully' });
        }
    });
};

exports.updateEventPhotoLink = (req, res) => {
    const eventId = req.body.eventId;
    const newLink = req.body.newLink;

    Event.updateEventPhotoLink(eventId, newLink, (err, data) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error updating event link' });
        } else {
            res.status(200).json({ message: 'Event link updated successfully' });
        }
    });
};

exports.updateEventInfo = (req, res) => {
    const { eventId, country, city, street, house, date } = req.body;

    Event.updateEventInfo(eventId, country, city, street, house, date, (err, data) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error updating event information' });
        } else {
            res.status(200).json({ message: 'Event information updated successfully' });
        }
    });
};
