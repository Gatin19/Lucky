module.exports = {
    name: "ping",
    aliases: ["latencia"],
    run: async(client, message, args) => {
        message.reply(`Pong! **${client.ws.ping}**`)
    }
}