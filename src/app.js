const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/user');  // Import the User model
const bcrypt = require('bcrypt');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('public'));
app.use(express.static('src'));  // Add this line to serve files from 'src'

app.use(cors());

// Add user registration route
app.post('/adduser', async (req, res) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const usersCollection = req.app.locals.db.collection('Users');

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        await usersCollection.insertOne({ email, username, password: hashedPassword });
        res.status(200).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});


module.exports = app;
