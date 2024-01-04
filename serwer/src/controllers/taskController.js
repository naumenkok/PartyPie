const Task = require('../models/taskModel');

exports.getTasksByEventId = (req, res) => {
    const eventId = req.params.eventId;

    Task.getTasksByEventId(eventId, (err, tasks) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving tasks' });
        } else {
            res.status(200).json(tasks);
        }
    });
};

exports.toggleTaskStatusById = (req, res) => {
    const task_id = req.params.taskId;
    Task.toggleStatusById(task_id, (err) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error toggling status', err });
        } else {
            res.status(200).json({ message: 'Status toggled successfully' });
        }
    });
};

exports.updateTaskName = (req, res) => {
    const { taskId, name } = req.body;
    Task.updateTaskName(taskId, name, (err, result) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error updating task name' });
        } else {
            if (result.changedRows > 0) {
                res.status(200).json({ message: 'Task name updated successfully' });
            } else {
                res.status(404).json({ error: 'Task not found or no changes made' });
            }
        }
    });
};

exports.deleteTask = (req, res) => {
    const taskId = req.params.taskId;

    Task.deleteTask(taskId, (err, result) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error deleting task' });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'Task deleted successfully' });
            } else {
                res.status(404).json({ error: 'Task not found' });
            }
        }
    });
};

exports.addTask = (req, res) => {
    const { eventId, name, priority } = req.body;

    Task.addTask(eventId, name, priority, (err, result) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error adding task' });
        } else {
            res.status(201).json({ message: 'Task added successfully' });
        }
    });
};

