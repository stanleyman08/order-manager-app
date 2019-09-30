import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true
    },
    priceSmall: {
        type: Number,
        default: null
    },
    priceMedium: {
        type: Number,
        default: null
    },
    priceLarge: {
        type: Number,
        default: null
    }
});

let Food = mongoose.model('food', FoodSchema);
export default Food;
