const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../models/UserModel');

const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('Hello, world!');
});

router.post('/register', (req, res) => {
    const { userName, email, password } = req.body;

    const user = new UserModel({
        userName,
        email,
        password,
    });

    user.save()
        .then(() => {
            res.send('User registered successfully');
        })
        .catch((err) => {
            res.send(err);
        });
}
);



// Export the router
module.exports = router;