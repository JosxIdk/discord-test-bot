const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, Permissions, GuildMember, } = require("discord.js");
const { successEmbed } = require("../Utils/Utilities");
const { falseEmbed } = require("../Utils/Utilities");
const dayjs = require('dayjs')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .addUserOption((option) => 
        option.setName("user").setDescription("The user to get information")
    )
    .setDescription("userinfo"),
  async execute(interaction, client) {
    
    const user = interaction.options.getUser("user") || interaction.member;
    const member = interaction.guild.members.cache.get(user.id)
    console.log(member.joinedAt / 1000)

    const embed = new EmbedBuilder()
    .setTitle(`${user.user.username}'s information`)
    .addFields({
      name: 'User ID',
      value: `${user.id}`,
      inline: true,
    },
    {
      name: 'Discord member since',
      value: `${dayjs(user.createdAt).format("DD/MM/YYYY")}`,
      inline: true,
    },
    { 
      name: 'Server member since',
      value: `${dayjs(member.joinedAt).format("DD/MM/YYYY")}`
    },
    { 
      name: 'Roles',
      value: `${member.roles.cache.map(x => x).join(' ').replace("@everyone", " ")}`,
      inline: true,
    },
    {
      name: 'Is Bot',
      value: `${user.bot ? 'Yes' : 'No'}`,
      inline: true
    })
    .setColor("Green")
    .setThumbnail(user.displayAvatarURL({ dynamic: true}))

    interaction.reply({ embeds: [embed]})
  },
};
