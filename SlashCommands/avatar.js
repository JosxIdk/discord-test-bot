const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, Permissions, GuildMember, } = require("discord.js");
const { successEmbed } = require("../Utils/Utilities");
const { falseEmbed } = require("../Utils/Utilities");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .addMentionableOption((option) => 
        option.setName("user").setDescription("The user to get information")
    )
    .setDescription("avatar"),
  async execute(interaction, client) {
    
    const user = interaction.options.getMember("user") || interaction.member;


    const embed = new EmbedBuilder()
    .setDescription(
        `[Download Avatar](${user.displayAvatarURL({
            format: 'png',
            dynamic: true
        })})`
    )
    .setImage(user.displayAvatarURL({ dynamic: true }))
    .setColor("Green")

    interaction.reply({ embeds: [embed]})
  },
};
