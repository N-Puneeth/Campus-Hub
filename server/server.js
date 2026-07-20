const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// 1. Load environment variables FIRST before anything else uses them
dotenv.config();

// 2. Import all routes cleanly together
const eventRoutes = require("./routes/eventRoutes");
const messRoutes = require("./routes/messRoutes");
const noteRoutes = require("./routes/noteRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const announcementRoutes = require('./routes/announcementRoutes');

// 3. Connect to Database
connectDB();

const app = express();

// 4. Middleware (Defined exactly once)
app.use(
    cors({
        origin: [
            "http://localhost:5173", // Keep this so you can still test locally
            "https://campus-hub-tau-one.vercel.app" // Add your live URL here
        ],
        credentials: true
    })
);
app.use(express.json());

// 5. Mount Routes
app.use("/api/quote", quoteRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/mess", messRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/announcements", announcementRoutes);

// Base API route
app.get("/", (req, res) => {
    res.json({
        message: "Campus Hub API is running 🚀"
    });
});

// 6. Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});