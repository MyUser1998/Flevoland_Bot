const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    const channel = message.guild.channels.cache.find(ch => ch.name === "suggesties");
    if(!channel) return message.reply("Channel niet gevonden!");

    var argsBericht = args.join(" ");
    if(!argsBericht) return message.reply("Graag een suggestie meegeven!");

    var embed = new Discord.MessageEmbed()
        .setDescription(argsBericht)
        .setTitle("Suggestie")
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setFooter("Flevoland")
        .setTimestamp()
        .setColor("#ff6f00");

    channel.send(embed).then(async (msg) => {

        await msg.react("✅");
        await msg.react("❌");
        await msg.react("🔒");
        message.delete();
    }).catch(err => {
        console.log(err);
    });



}

module.exports.help = {
    name: "suggestie"
}