const colors = require("colors")

module.exports = {
    name: "ready",
    run: async(client) => {
        console.log("[CLIENT] ".green.bold + client.user.tag + "• Online")
    }
}