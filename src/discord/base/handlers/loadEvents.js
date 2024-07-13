const fs = require("fs")
const colors = require("colors")

module.exports = (client) => {
    fs.readdirSync("src/discord/events").forEach(file => {
        const event = require(`../../events/${file}`)
        client.on(event.name, event.run)
        console.log('✓ '.green + event.name.blue.bold + ' Event loaded successfully'.green)
    })
}
