const { Events } = require('discord.js')
const Schema = require('../Db/Models/member')

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const data = await Schema.findOne({ guildId: member.guild.id})
        if(!data) {
            const data2 = new Schema({
                userId: member.id,
                username: member.user.username,
                guildId: member.guild.id
            })
           await data2.save()
        }
    }
}