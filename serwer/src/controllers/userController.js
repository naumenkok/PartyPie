const User = require('../models/userModel');

exports.createUser = (req, res) => {
    const newUser = req.body;

    User.createUser(newUser, (err, userId) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error creating user' });
        } else {
            res.status(201).json({ user_id: userId });
        }
    });
};

exports.getUserById = (req, res) => {
    const {userId} = req.query;

    User.getUserById(userId, (err, user) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving user' });
        } else {
            res.status(200).json(user);
        }
    });
};

exports.getAllUsers = (req, res) => {
    User.getAllUsers((err, users) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving users' });
        } else {
            res.status(200).json(users);
        }
    });
};

exports.getUserByLoginAndPassword = (req, res) => {
    const { username, password } = req.body;

    User.getUserByLoginAndPassword(username, password, (err, user) => {
        if (err) {
            console.error('Error in controller:', err);
            res.status(500).json({ error: 'Error retrieving user' });
        } else if (!user) {
            res.status(401).json({ error: 'Invalid login or password' });
        } else {
            res.status(200).json({ user_id: user.user_id });
        }
    });
};

