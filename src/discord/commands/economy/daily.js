const userSchema = require("../../../schemas/users")
const { relativeTime } = require("util-stunks")
const { EmbedBuilder } = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "daily",
    run: async(client, message, arga) => {
        const userID = message.author.id
        const avatar = message.author.displayAvatarURL({ dynamic: true, size: 2048});

        const userDB = await userSchema.findOne({ _id: userID})

        if(userDB?.cooldowns?.daily > Date.now()){ 
            return message.reply(`Você ja coletou sua recompensa diária volte daqui **${relativeTime(userDB.cooldowns.daily, {removeMs: true, display: 2 })}**`)
        }

        function random(min, max) {
            return Math.round(Math.random() * (max - min) + min)
        }

        const value = random(2555, 3555)

        const embed = new EmbedBuilder()
        .setAuthor({ name: message.author.username, iconURL: avatar })
        .setDescription(`Você coletou sua recompensa diária e ganhou **R$${value.toLocaleString()}**`)
        .setColor(0x43B581)
        .setTimestamp();

        userDB.money += value;
        userDB.cooldowns.daily = Date.now() + ms('24h')
        await userDB.save()

        message.reply({
            embeds: [embed]
        })
    }
}