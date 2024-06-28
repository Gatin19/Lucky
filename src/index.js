const { Client, ShardClientUtil } = require("discord.js");
require("dotenv").config()

const client = new Client({
    intents: 3276799
});

client.login(process.env.TOKEN)

module.exports = client;

require("./handlers/loadEvents")(client);