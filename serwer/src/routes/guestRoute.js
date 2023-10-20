const express = require('express');
const router = express.Router();
const GuestController = require('../controllers/guestController');

router.get('/guest/:userId/events', GuestController.getEventsByGuestId);
router.get('/guest/:userId/past-events', GuestController.getPastEventsByGuestId);
router.get('/guest/:userId/future-events', GuestController.getFutureEventsByGuestId);

module.exports = router;
