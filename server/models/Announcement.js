const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    type: {
        type: String,
        // Enforcing specific types so the frontend icons color correctly
        enum: ['academic', 'event', 'note', 'alert', 'default'],
        default: 'default'
    },
    time: {
        type: String,
        required: true // Example: "2 hours ago" or "Yesterday"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Announcement', announcementSchema);