const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Player = require('../models/player');

dotenv.config();

mongoose.connect('mongodb://localhost:27017/football-db')
    .then(async () => {
        const newPlayer = new Player({
            name: 'Lionel Messi',
            team: 'Inter Miami',
            position: 'Forward',
            nationality: 'Argentinean',
            age: 39,
            goals: 789,
        });

        await newPlayer.save();
        console.log('New player added:', newPlayer);
        await mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error:', err);
    });
