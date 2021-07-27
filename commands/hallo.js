const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    return message.reply("Hallo!");
}

module.exports.help = {
    name: "hallo"
}