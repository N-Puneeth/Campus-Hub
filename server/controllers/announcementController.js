const Announcement = require('../models/Announcement');

// @desc    Get all announcements
// @route   GET /api/announcements
const getAnnouncements = async (req, res) => {
    try {
        // Fetch announcements sorted by the newest first
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// @desc    Create a new announcement
// @route   POST /api/announcements
const createAnnouncement = async (req, res) => {
    try {
        const { title, desc, type, time } = req.body;

        const announcement = await Announcement.create({
            title,
            desc,
            type,
            time
        });

        res.status(201).json(announcement);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getAnnouncements,
    createAnnouncement
};