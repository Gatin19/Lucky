const mongoose = require("mongoose")

const user = new mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    money: { type: Number, default: 0 },
    cooldowns: {
       work: { type: Date, default: Date.now() },
       daily: { type: Date, default: Date.now() },
    },
});

module.exports = mongoose.model("Users", user)