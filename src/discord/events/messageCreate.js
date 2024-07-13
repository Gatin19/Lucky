const client = require('../../index')
const guilds = require("../../database/schemas/guilds")
const users = require("../../database/schemas/users")

module.exports = {
    name: 'messageCreate',
    run: async(message) => {
        if(message.author.bot) return;
        
        const guild = await guilds.findOne({ _id: message.guild.id })
        if(!guild) {
            const newGuild = await guilds.create({
                _id: message.guild.id
            })
            await newGuild.save()
        }

        const user = await users.findOne({ _id: message.author.id })
        if(!user) {
            const newUser = await users.create({
                _id: message.author.id,
                username: message.author.username
            })
            await newUser.save()
        }


        const prefix = guild.prefix
        if(message.content.replace('!','') === `<@${client.user.id}>`) return message.reply(`Olá ${message.author.username}, meu prefixo é \`${prefix}\``)

        if(!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(' ')

        const command = args.shift()?.toLowerCase()
        const cmd = client.commands.get(command) || client.commands.find(als => als.aliases && als.aliases.includes(command))
        if(cmd) return cmd.run(client, message, args)
    }
}