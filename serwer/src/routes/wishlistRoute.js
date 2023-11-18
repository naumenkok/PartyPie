const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/wishlistController');

router.get('/event/:eventId/wishlist', WishlistController.getWishlistByEventId);
router.put('/wishlist/toggleStatus', WishlistController.toggleStatusById);

module.exports = router;
