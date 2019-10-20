import mongoose from 'mongoose';

const SchoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

let School = mongoose.model('school', SchoolSchema);
export default School;
