const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EventController');

router.get('/user/:userId/events', EventController.getMyEventsByUserId);
router.get('/user/:userId/past-events', EventController.getPastMyEventsByUserId);
router.get('/user/:userId/future-events', EventController.getFutureMyEventsByUserId);
router.get('/event/:eventId', EventController.getEventsByEventId);
router.post('/event/addNew', EventController.addEvent);
router.delete('/event/delete/:eventId', EventController.deleteEventByEventId);
router.get('/event/daysUntil/:eventId', EventController.getDaysUntilEvent);



module.exports = router;
