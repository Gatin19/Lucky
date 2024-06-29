const colors = require("colors")
const mongoose = require("mongoose")
require("dotenv").config()

module.exports = {
    name: "ready",
    run: async(client) => {
        console.log("[CLIENT] ".green.bold + client.user.tag + "• Online");

            try {
                mongoose.connect(process.env.MONGO_URI).then(() => {
                    console.log("[DATABASE] ".green.bold + "connected with mongodb")
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
