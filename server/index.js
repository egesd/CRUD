const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const FoodModel = require('./models/Food');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://ege:testi123@cluster0.id1xd.mongodb.net/food?retryWrites=true&w=majority', {
    useNewUrlParser: true,
}, {
    useUnifiedTopology: true
});

app.post('/insert', async (req, res) => {

    const foodName = req.body.foodName;
    const days = req.body.days;

    const food = new FoodModel({
        foodName: foodName,
        daysSinceIAte: days
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