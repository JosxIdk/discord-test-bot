const { Client, GatewayIntentBits, Collection } = require('discord.js')
require('dotenv').config()
const client =  new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]
})
const path = require('path')
const fs = require('fs')


client.commands = new Collection()

const Mongo = require('../Db/Mongo')

Mongo("")

const eventsPath = path.join(__dirname, '../Events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, async (...args) => event.execute(...args));
	} else {
		client.on(event.name, async (...args) => event.execute(...args));
	}
}

client.login(process.env.TOKEN)


module.exports = client;