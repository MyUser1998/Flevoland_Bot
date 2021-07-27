const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    message.reply("Ping aan het berekenen.....").then(resultMessage => {
        const ping = resultMessage.createdTimestamp - message.createdTimestamp

        resultMessage.edit(`Ping ${ping} ms.`);
    })
}

module.exports.help = {
    name: "ping"
}