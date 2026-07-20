const express = require('express');
const router = express.Router();
const { getAnnouncements, createAnnouncement } = require('../controllers/announcementController');

// GET /api/announcements
// POST /api/announcements
router.route('/').get(getAnnouncements).post(createAnnouncement);

module.exports = router;