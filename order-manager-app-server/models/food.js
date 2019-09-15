const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true
    },
    priceSmall: {
        type: Number
    },
    priceMedium: {
        type: Number
    },
    priceLarge: {
        type: Number
    }
});

module.exports = Food = mongoose.model('food', FoodSchema);
