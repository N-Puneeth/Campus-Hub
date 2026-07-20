const mongoose = require('mongoose');

const messMenuSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true // e.g., "Monday"
    },
    weekType: {
        type: String,
        enum: ['odd', 'even', 'both'], 
        default: 'both' // Use 'both' if the menu is the same every week
    },
    breakfast: {
        type: String,
        required: true
    },
    lunch: {
        type: String,
        required: true
    },
    dinner: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('MessMenu', messMenuSchema);