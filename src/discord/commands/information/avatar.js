const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders");
const { ButtonStyle } = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: ["useravatar", "user-avatar", "av"],
    run: async(client, message, args) => {
        const user = message.mentions.members.first() || client.users.cache.get(args[0]) || message.author;

        const avatar = user.displayAvatarURL({ dynamic: true, size: 2048});

        const embed = new EmbedBuilder()
        .setTitle(`Avatar de ${user.username}`)
        .setImage(avatar)
        .setTimestamp()
        .setColor(0x43B581)

        const button = new ButtonBuilder()
        .setLabel("Ver no navegador")
        .setURL(avatar)
        .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder().addComponents(button)

        message.reply({
            embeds: [embed],
            components: [row]
        })
    }
}