const User = require('../models/userModel');

exports.createUser = async (req, res) => {
    const { name, surname, username, email, password } = req.body;
    const userInstance = new User();

    try {
        const userId = await userInstance.createUser(name, surname, username, email, password);
        res.status(201).json({ user_id: userId });
    } catch (err) {
        console.error('Error in controller:', err);
        res.status(500).json({ error: 'Error creating user' });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.userId;
    const userInstance = new User();

    try {
        const user = await userInstance.getUserById(userId);
        res.status(200).json(user);
    } catch (err) {
        console.error('Error in controller:', err);
        res.status(500).json({ error: 'Error retrieving user', err: err });
    }
};

exports.getAllUsers = async (req, res) => {
    const userInstance = new User();
    try {
        const users = await userInstance.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error in controller:', err);
        res.status(500).json({ error: 'Error retrieving users' });
    }
};

exports.getUserByLoginAndPassword = async (req, res) => {
    const { username, password } = req.body;
    const userInstance = new User();

    try {
        const user = await userInstance.getUserByLoginAndPassword(username, password);
        if (!user) {
            res.status(401).json({ user_id: null });
        } else {
            res.status(200).json({ user_id: user.user_id });
        }
    } catch (err) {
        console.error('Error in controller:', err);
        res.status(500).json({ error: 'Error retrieving user' });
    }
};

