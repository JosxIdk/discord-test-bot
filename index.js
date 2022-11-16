const { getFilesRecursively } = require('./Utils/utilities')
const client = require('./Classes/Client')
require('dotenv').config()

for (const file of getFilesRecursively('./SlashCommands')) {
    const command = require(`./${file}`)
    client.commands.set(command.data.name, command)
}