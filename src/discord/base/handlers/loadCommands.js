const fs = require('fs')
const colors = require("colors")

module.exports = (client) => {
    fs.readdirSync("src/discord/commands").forEach(folder => {
        fs.readdirSync(`src/discord/commands/${folder}`).forEach(file => {
            const cmd = require(`../../commands/${folder}/${file}`)
            client.commands.set(cmd.name, cmd)
            console.log('✓ '.green + cmd.name.blue.bold + ' Command loaded successfully'.green)
        })

    })

}