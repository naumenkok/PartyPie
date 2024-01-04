const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

router.get('/event/:eventId/tasks', TaskController.getTasksByEventId);
router.put('/tasks/toggleStatus/:taskId', TaskController.toggleTaskStatusById);
router.put('/tasks/updateName', TaskController.updateTaskName);
router.delete('/tasks/delete/:taskId', TaskController.deleteTask);
router.post('/tasks/add', TaskController.addTask);


module.exports = router;
