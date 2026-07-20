const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: true,
        },

        professor: {
            type: String,
            required: true,
        },

        fileUrl: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Note", noteSchema);