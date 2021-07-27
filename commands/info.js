const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    var botEmbed = new Discord.MessageEmbed()
            .setTitle("Flevoland")
            .setColor("#ff6f00")
            .addFields(
                {name: "Owner", value: message.guild.owner},
                {name: "Members", value: message.guild.memberCount},
                {name: "Region", value: message.guild.region},
                {name: "Rules channel", value: message.guild.rulesChannel},
            )
            .setFooter("Flevoland")
            .setTimestamp();

    
    return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "info"
}