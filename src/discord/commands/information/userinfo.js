const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "userinfo",
    aliases: ["user-info", "ui"],
    run: async(client, message, args) => {
        const user = message.mentions.members.first() || client.users.cache.get(args[0]) || message.author;

        const embed = new EmbedBuilder()
        .setTitle(`Informações de ${user.tag}`)
        .setFields(
            {
                name: "Tag:",
                value: `\`${user.globalName}\` (\`@${user.username}\`)`,
                inline: true
            },
            {
                name: "ID:",
                value: `\`${user.id}\``,
                inline: true
            },
            {
                name: "Data de criação da conta:",
                value: `<t:${Math.floor(user.createdTimestsmp)}:F>`
            }
        )
        .setColor(0x43B581);

        message.reply({
            embeds: [embed]
        })

    }
}
