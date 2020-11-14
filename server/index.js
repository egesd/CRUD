const express = require('express');
const mongoose = require('mongoose');
const app = express();

const FoodModel = require('./models/Food');

app.use(express.json());

mongoose.connect('mongodb+srv://ege:testi123@cluster0.id1xd.mongodb.net/food?retryWrites=true&w=majority', {
    useNewUrlParser: true,
}, {
    useUnifiedTopology: true
});

app.get('/', async (req, res) => {
    const food = new FoodModel({
        foodName: 'Apple',
        daysSinceIAte: 3
    })

    try {
        await food.save();
        res.send('inserted data');
    } catch (err) {
        console.log(err);
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001....')
});