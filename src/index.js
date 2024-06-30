const { CreateClient } = require("./discord/base/Client.js");

const client = new CreateClient()

process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);
module.exports = client;

client.start()