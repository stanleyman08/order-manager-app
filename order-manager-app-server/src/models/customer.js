import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    }
});

let Customer = mongoose.model('customer', CustomerSchema);
export default Customer;
