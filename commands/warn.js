 const Discord = require("discord.js");
 const fs = require("fs");
 const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

    module.exports.run = async (client, message, args) => {
    
    
    
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("U kunt deze command niet uitvoeren!");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("De bot heeft geen permissions!");

    if (!args[0]) return message.reply("Geen gebruiker opgegeven!");

    if (!args[1]) return message.reply("Geen reden opgegeven!");

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.memberCount.members.get(args[0]));

    var reason = args.slice(1).join(" ");

    var LogChannel = client.channels.cache.get('868526363701837914');

    if (!warnUser) return message.reply("Gebruiker niet gevonden!");

    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("U kunt deze gebruiker niet warnen!");

    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    };

    warns[warnUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if(err) console.log(err);
    });

    var embed = new Discord.MessageEmbed()
        .setColor("#ff6f00")
        .setDescription(`${warnUser} ${warnUser.id} is gewarnt! | Reden: **${reason}** \n Door: ${message.author}`)
        .setTitle("Flevoland")
        .setFooter("Flevoland")
        .setTimestamp()
        .addField("Aantal warns", warns[warnUser.id].warns);

    
    LogChannel.send(embed);
    if (!LogChannel) return;


}
    
    module.exports.help = {
        name: "warn"
    }