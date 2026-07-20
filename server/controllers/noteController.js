const Note = require("../models/Note");

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();

        res.json(notes);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const createNote = async (req, res) => {
    try {
        const note = await Note.create(req.body);

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getNotes,
    createNote,
};