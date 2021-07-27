const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("U kunt deze command niet uitvoeren!");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("De bot heeft geen permissions!");

    if (!args[0]) return message.reply("Geen gebruiker opgegeven!");

    if (!args[1]) return message.reply("Geen reden opgegeven!");

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.memberCount.members.get(args[0]));

    var reason = args.slice(1).join(" ");

    var LogChannel = client.channels.cache.get('868526363701837914')

    if (!kickUser) return message.reply("Gebruiker niet gevonden!");

    if(kickUser.hasPermission("MANAGE_MESSAGES")) return message.reply("U kunt deze gebruiker niet kicken!");

    var embedPrompt = new Discord.MessageEmbed()
        .setColor("#ff6f00")
        .setTitle("Flevoland")
        .setDescription(`Wil je ${kickUser} kicken?`);

    var embed = new Discord.MessageEmbed()
        .setColor("#ff6f00")
        .setDescription(`${kickUser} ${kickUser.id} is gekickt! | Reden: **${reason}**`)
        .setTitle("Flevoland")
        .setFooter("Flevoland")
        .setTimestamp();

    message.channel.send(embedPrompt).then(async msg => {

        var emoji = await promptMessage(msg, message.author, 10, ["✅", "❌"]);

        if(emoji = "✅"){

            msg.delete();

            kickUser.kick(reason).catch(err => {
                if(err) return message.reply("Er is iets fout gegaan.");
            });

            message.channel.send(embed);
            LogChannel.send(embed);

        }else if(emoji === "❌"){

            msg.delete();

            return message.reply("Kick geannuleerd.").then(m => m.delete(5000));

        }

    })

}

async function promptMessage(message, author, time, reactions){

    time *= 1000;

    for(const reaction of reactions){
        await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, {max: 1, time: time}).then(collected => collected.first() && collected.first().emoji.name);
    
}

module.exports.help = {
    name: "kick"
}