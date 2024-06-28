const { Client, Collection } = require("discord.js");
require("dotenv").config()

const client = new Client({
    intents: 3276799
});

client.commands = new Collection()

process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);

client.login(process.env.TOKEN)

module.exports = client;

require("./handlers/loadEvents")(client);
require("./handlers/loadCommands.js")(client);