require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist. "});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials!' });

        const token = await jwt.sign({ email: existingUser.email, id: existingUser._id}, process.env.SECRET, { expiresIn: "1h" } );

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

const signup = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: 'User already registered.'});

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match."})

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
        })

        const token = await jwt.sign({ email: result.email, id: result._id}, process.env.SECRET, { expiresIn: '1h' })

        res.status(200).json({ result, token })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.'})
    }
}

module.exports = { signin, signup }