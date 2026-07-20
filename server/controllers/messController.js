const Mess = require("../models/MessMenu");

const getMess = async (req, res) => {
    try {
        const mess = await Mess.find();

        res.json(mess);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const createMess = async (req, res) => {
    try {
        const item = await Mess.create(req.body);

        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getMess,
    createMess,
};