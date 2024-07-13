const userSchema = require("../../../database/schemas/users")
const { relativeTime, randomArray } = require("util-stunks")
const { EmbedBuilder } = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "work",
    run: async (client, message, arga) => {
        const userID = message.author.id
        const avatar = message.author.displayAvatarURL({ dynamic: true, size: 2048 });

        const userDB = await userSchema.findOne({ _id: userID })

        if (userDB?.cooldowns?.work > Date.now()) {
            return message.reply(`Você ja trabalhou recentemente podera trabalha novamente em **${relativeTime(userDB.cooldowns.work, { removeMs: true, display: 2 })}**`)
        }

        function random(min, max) {
            return Math.round(Math.random() * (max - min) + min)
        }

        const value = random(255, 555)
        const jobs = ["Motorista", "Programador", "Caminhoneiro", "Jornalista", "Pintor", "Engenheiro", "Advogado"]

        const embed = new EmbedBuilder()
            .setAuthor({ name: message.author.username, iconURL: avatar })
            .setDescription(`Você trabalhou como ${randomArray(jobs)} e recebeu **R$${value.toLocaleString()}**`)
            .setColor(0x43B581)
            .setTimestamp();

        userDB.money += value;
        userDB.cooldowns.work = Date.now() + ms('2m')
        await userDB.save()

        message.reply({
            embeds: [embed]
        })
    }
}