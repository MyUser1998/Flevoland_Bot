const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    const catergoryID = "868138224218947664";

    if(!message.member.hasPermissions("KICK_MEMBERS")) return message.reply("U kan deze command niet uitvoeren!");

    if(message.channel.parentID == catergoryID){
        message.channel.delete();

        var embed = new Discord.MessageEmbed()
        .setTitle("Ticket, " + message.channel.name)
        .setColor("#ff6f00")
        .setDescription("De ticket is afgehandeld!")
        .setFooter("Flevoland")
        .setTimestamp();

        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "log");
        if (!ticketChannel) return message.reply("Kanaal besaat niet");

    ticketChannel.send(embed);

    }else{

        message.reply("Graag deze command alleen in een ticket gebruiken!");

    }


}

module.exports.help = {
    name: "close"
}