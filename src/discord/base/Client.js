const { Client, Partials, Collection } = require("discord.js");
const fs = require("fs")
const Table = require("cli-table3")
const colors = require("colors")
require("dotenv").config();

const commandTable = new Table({
    head: ["Load commands".blue.bold],
    chars: {
        'top': '─',
        'top-mid': '┬',
        'top-left': '╭',
        'top-right': '╮',
        'bottom': '─',
        'bottom-mid': '┴',
        'bottom-left': '╰',
        'bottom-right': '╯',
        'left': '│',
        'left-mid': '│',
        'mid': ' ',
        'mid-mid': '┼',
        'right': '│',
        'right-mid': '│',
        'middle': '│'
    },
    style: { "compact": true },
    colWidths: [25],
    colAligns: ["center"]
});

const eventTable = new Table({
    head: ["Load Events".blue.bold],
    chars: {
        'top': '─',
        'top-mid': '┬',
        'top-left': '╭',
        'top-right': '╮',
        'bottom': '─',
        'bottom-mid': '┴',
        'bottom-left': '╰',
        'bottom-right': '╯',
        'left': '│',
        'left-mid': '│',
        'mid': ' ',
        'mid-mid': '┼',
        'right': '│',
        'right-mid': '│',
        'middle': '│'
    },
    style: { "compact": true },
    colAligns: ["center"],
    colWidths: [25],
});



class CreateClient extends Client {
    constructor() {
        super({
            intents: 3276799,
            partials: [Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User]
        })
        this.commands = new Collection();
    }
    start() {
        this.login(process.env.TOKEN)
        fs.readdirSync("src/discord/events").forEach(file => {
            const event = require(`../events/${file}`)
            this.on(event.name, event.run)
            eventTable.push(
                ["Loaded ".green.bold + event.name]
            )

        })

        fs.readdirSync("src/discord/commands").forEach(folder => {
            fs.readdirSync(`src/discord/commands/${folder}`).forEach(file => {
                const cmd = require(`../commands/${folder}/${file}`)
                this.commands.set(cmd.name, cmd)
                commandTable.push(
                    ["Loaded ".green.bold + cmd.name]
                )
            })

        })
        console.log(eventTable.toString())
        console.log(commandTable.toString())
    }
}

module.exports = { CreateClient }