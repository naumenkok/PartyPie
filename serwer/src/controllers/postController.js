const Post = require('../models/postModel');


exports.getMyEventsByUserId = (req, res) => {
    const eventId = req.params.eventId;

    Post.getAllPostsByEventId(eventId, (err, events) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving posts' });
        } else {
            res.status(200).json(events);
        }
    });
};