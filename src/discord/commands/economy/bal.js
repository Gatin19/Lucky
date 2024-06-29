const { EmbedBuilder } = require("discord.js");
const users = require("../../../schemas/users")

module.exports = {
    name: "saldo",
    aliases: ["bal", "atm", "carteira "],
    run: async(client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

        const userDB = await users.findOne({ _id: user.id })

        const embed = new EmbedBuilder()
        .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
        .setDescription(`${user} tem \`${userDB.money.toLocaleString()}\` em sua carteira.`)
        .setTimestamp();

        message.reply({
            embeds: [embed]
        })

    }
}