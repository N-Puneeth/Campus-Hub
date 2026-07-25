const mongoose = require('mongoose');

const messMenuSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true // e.g., "Monday"
    },
    weekType: {
        type: String,
        enum: ['Odd', 'Even', 'Both', 'odd', 'even', 'both'], // Updated to accept capitalized versions
        default: 'Both'
    },
    breakfast: {
        type: [String], // Updated to Array of Strings
        required: true
    },
    lunch: {
        type: [String], // Updated to Array of Strings
        required: true
    },
    snacks: {           // Added missing snacks field
        type: [String],
        required: true
    },
    dinner: {
        type: [String], // Updated to Array of Strings
        required: true
    }
});

module.exports = mongoose.model('MessMenu', messMenuSchema);