const Wishlist = require('../models/wishlistModel');

exports.getWishlistByEventId = (req, res) => {
    const eventId = req.params.eventId;

    Wishlist.getWishlistByEventId(eventId, (err, wishlist) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving wishlist' });
        } else {
            res.status(200).json(wishlist);
        }
    });
};

exports.toggleStatusById = (req, res) => {
    const itemId = req.body.itemId;
    const guestId = req.body.guestId;

    Wishlist.toggleStatusById(itemId, guestId, (err) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error toggling status', err });
        } else {
            res.status(200).json({ message: 'Status toggled successfully' });
        }
    });
};