import mongoose from 'mongoose';
import Food from './food';

const WeeklyMenuSchema = new mongoose.Schema({
    menuDate: {
        type: Date,
        required: true,
        unique: true
    },
    monday: {
        type: [mongoose.Schema.Types.ObjectId],
        validate: { validator: (menu) => isValidMenu(menu)}
    },
    tuesday: {
        type: [mongoose.Schema.Types.ObjectId],
        validate: { validator: (menu) => isValidMenu(menu)}
    },
    wednesday: {
        type: [mongoose.Schema.Types.ObjectId],
        validate: { validator: (menu) => isValidMenu(menu)}
    },
    thursday: {
        type: [mongoose.Schema.Types.ObjectId],
        validate: { validator: (menu) => isValidMenu(menu)}
    },
    friday: {
        type: [mongoose.Schema.Types.ObjectId],
        validate: { validator: (menu) => isValidMenu(menu)}
    },
    saturday: {
        type: [mongoose.Schema.Types.ObjectId],
        validate: { validator: (menu) => isValidMenu(menu)}
    },
    sunday: {
        type: [mongoose.Schema.Types.ObjectId],
        validate: { validator: (menu) => isValidMenu(menu)}
    },
});

const isValidMenu = (menu) => {
    menu.forEach(foodId => {
        Food.findById(foodId)
            .then(food => {
                console.log('Food found!');
            })
            .catch(err => {
                return Promise.reject('Food ID does not exist!');
            });
    });
};

let WeeklyMenu = mongoose.model('weeklyMenu', WeeklyMenuSchema);

export default WeeklyMenu;
