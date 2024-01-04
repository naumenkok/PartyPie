const mysql = require('mysql');
const db = require('../config');
const connection = mysql.createConnection(db.database);

class Task {
    static getTasksByEventId(eventId, callback) {
        const query = "SELECT * FROM tasks WHERE event_id = ?";
        connection.query(query, [eventId], (err, tasks) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, tasks);
            }
        });
    }

    static toggleStatusById(task_id, callback) {
        const query = "UPDATE tasks SET status = IFNULL(status, false) XOR true WHERE task_id = ?";
        connection.query(query, [task_id], (err, result) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err);
            } else {callback(null);
            }
        });
    }

    static updateTaskName(taskId, newName, callback) {
        const query = "UPDATE tasks SET name = ? WHERE task_id = ?";
        connection.query(query, [newName, taskId], (err, result) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    static deleteTask(taskId, callback) {
        const query = "DELETE FROM tasks WHERE task_id = ?";
        connection.query(query, [taskId], (err, result) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    static addTask(eventId, name, priority, callback) {
        const status = false;

        const getLastTaskIdQuery = "SELECT MAX(task_id) AS lastTaskId FROM tasks";
        connection.query(getLastTaskIdQuery, (err, result) => {
            if (err) {
                console.error('Error in SQL query', err);
                callback(err, null);
            } else {
                const lastTaskId = result[0].lastTaskId || 0;
                const newTaskId = lastTaskId + 1;

                const insertQuery = "INSERT INTO tasks (task_id, event_id, name, priority, status) VALUES (?, ?, ?, ?, ?)";
                connection.query(insertQuery, [newTaskId, eventId, name, priority, status], (err, result) => {
                    if (err) {
                        console.error('Error in SQL query', err);
                        callback(err, null);
                    } else {
                        callback(null, result);
                    }
                });
            }
        });
    }


}

module.exports = Task;