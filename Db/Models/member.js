const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    userId: String,
    username: String,
    guildId: String,
})

module.exports = mongoose.model('members', Schema)