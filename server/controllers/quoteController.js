const Quote = require("../models/Quote");

const getQuote = async (req, res) => {
    try {
        // 1. Get the total number of quotes in your MongoDB collection
        const count = await Quote.countDocuments();
        
        // Fallback if you haven't added any quotes to MongoDB Compass yet
        if (count === 0) {
            return res.json({
                text: "The beautiful thing about learning is that no one can take it away from you.",
                author: "B.B. King"
            });
        }

        // 2. Calculate the current day of the year (1 - 365)
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        // 3. Modulo operator maps the day of the year to your current pool of quotes
        const quoteIndex = dayOfYear % count;

        // 4. Skip to that specific index to grab today's unique quote
        const quote = await Quote.findOne().skip(quoteIndex);

        res.json(quote);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const createQuote = async (req, res) => {
    try {
        const { text, author } = req.body;

        const quote = await Quote.create({
            text,
            author,
        });

        res.status(201).json(quote);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getQuote,
    createQuote,
};