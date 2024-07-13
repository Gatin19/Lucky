const { Client, Partials, Collection } = require("discord.js");
const loadCommands = require("./handlers/loadCommands")
const loadEvents = require("./handlers/loadEvents")

require("dotenv").config();

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
        loadCommands(this);
        console.log()
        loadEvents(this);
    }
}

module.exports = { CreateClient }