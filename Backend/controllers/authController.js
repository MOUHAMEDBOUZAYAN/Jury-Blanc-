const User = require('../models/User');
const bcrypt = require('bcryptjs');


exports.signup = async (req, res) => {
    const {username, email, password } = req.bosy;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message : 'User already exists '

            }); 
        }

        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message : 'User created successfully '});
    }catch (error) {
        res.status(201).json({ message : 'Something went wrong '});
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message : 'Invalide credentials ' 
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message : 'Invalid credentilas'
            });
        }
        res.status(200).json({ message : 'Login successful', user: {id: user._id, username: user.username} });
    }catch (error) {
        res.status(500).json({ message : 'someting went wrong' });
    }
};