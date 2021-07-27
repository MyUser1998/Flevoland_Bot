const Discord = require("discord.js");
const fs = require("fs");
const canvaCord = require("canvacord");

module.exports.run = async (client, message, args) => {
    
    const levelFile = JSON.parse(fs.readFileSync("./levels.json"));

    const member = message.member.id;

    var nextlevelXp = levelFile[member].level * 300;

    if(nextlevelXp == 0) nextlevelXp = 100;

    if(levelFile[member]){

        const rank = new canvaCord.Rank()
        .setAvatar(message.author.displayAvatarURL({dynamic: false, format: 'png'}))
        .setCurrentXP(levelFile[member].xp)
        .setLevel(levelFile[member].level)
        .setRequiredXP(nextlevelXp)
        .setLevelColor("#ff6f00")
        .setProgressBar("#ff6f00", 'COLOR')
        .setUsername(message.author.username)
        .setDiscriminator(messgae.author.discriminator);

    rank.build().then(data => {
        const attachment = new Discord.MessageAttachment(data, "Name.png");
        message.channel.send(attachment)
    });

    }else{
        message.reply("Nog geen gegevens gevonden!");
    }



}

module.exports.help = {
    name: "rank"
}