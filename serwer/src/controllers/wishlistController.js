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

exports.updateWishlistItem = (req, res) => {
    const wishId = req.params.wishId;
    const newName = req.body.name;
    const newLink = req.body.link;

    Wishlist.updateWishlistItem(wishId, newName, newLink, (err, result) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error updating wishlist item' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Row updated successfully' });
            } else {
                res.status(404).json({ error: 'Row not found' });
            }
        }
    });
};

exports.deleteWishlistItem = (req, res) => {
    const wishId = req.params.wishId;

    Wishlist.deleteWishlistItem(wishId, (err, result) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error deleting wishlist item' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Row deleted successfully' });
            } else {
                res.status(404).json({ error: 'Row not found' });
            }
        }
    });
};