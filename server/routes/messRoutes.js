const express = require("express");

const router = express.Router();

const {
    getMess,
    createMess,
} = require("../controllers/messController");

router.get("/", getMess);
router.post("/", createMess);

module.exports = router;