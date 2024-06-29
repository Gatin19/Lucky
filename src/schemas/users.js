const mongoose = require("mongoose")

const user = new mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true},
    money: { type: Number, default: 0 }
});

module.exports = mongoose.model("Users", user)