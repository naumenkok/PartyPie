const express = require('express');
const router = express.Router();
const WishlistController = require('../controllers/wishlistController');

router.get('/event/:eventId/wishlist', WishlistController.getWishlistByEventId);
router.put('/wishlist/toggleStatus', WishlistController.toggleStatusById);
router.put('/wishlist/update/:wishId', WishlistController.updateWishlistItem);
router.delete('/wishlist/delete/:wishId', WishlistController.deleteWishlistItem);


module.exports = router;
