const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders");
const { ButtonStyle } = require("discord.js");
const { icons } = require("../../../settings.json")

module.exports = {
    name: "servericon",
    aliases: ["guildicon", "guild-icon", "server-icon"],
    run: async (client, message, args) => {
        const icon = message.guild.iconURL({ dynamic: true, size: 2048 });
        if(!icon) return message.reply(`${icons.wrong} **|** O servidor atual não possuí um ícone.`)

        const embed = new EmbedBuilder()
            .setTitle(`Avatar do servidor`)
            .setImage(icon)
            .setTimestamp()
            .setColor(0x43B581)

        const button = new ButtonBuilder()
            .setLabel("Ver no navegador")
            .setURL(icon)
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder().addComponents(button)

        message.reply({
            embeds: [embed],
            components: [row]
        })
    }
}