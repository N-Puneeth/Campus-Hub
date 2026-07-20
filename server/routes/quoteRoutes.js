const express = require("express");

const router = express.Router();

const {
    getQuote,
    createQuote,
} = require("../controllers/quoteController");

router.get("/", getQuote);

router.post("/", createQuote);

module.exports = router;