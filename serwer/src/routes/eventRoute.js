const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EventController');

router.get('/user/:userId/events', EventController.getMyEventsByUserId);
router.get('/user/:userId/past-events', EventController.getPastMyEventsByUserId);
router.get('/user/:userId/future-events', EventController.getFutureMyEventsByUserId);

module.exports = router;
