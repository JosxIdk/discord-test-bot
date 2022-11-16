const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions, GuildMember, EmbedBuilder, } = require("discord.js");
const { successEmbed } = require("../Utils/Utilities");
const { falseEmbed } = require("../Utils/Utilities");
const fetch = require('node-fetch')


module.exports = {
  data: new SlashCommandBuilder()
    .setName("randomcat")
    .setDescription("randomcat"),
  async execute(interaction, client) {

    const data = await fetch('https://api.thecatapi.com/v1/images/search', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())

    const embed = new EmbedBuilder()
    .setTitle('Random Cat')
    .setDescription('There you go! Here is a random cat.')
    .setImage(`${data[0].url}`)
    interaction.reply({ embeds: [embed]})
  },
};
