const expresse = require('express');
const User = require('../models/User');
const router = expresse.Router();
const bcrypt = require('bcryptjs');


router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: 'User Create Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'

            });
        }

        res.status(200).json({ message: 'Login successful', user: { id: user._id, useranme: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Someting went wrong' });
    }
});

module.exports = router;