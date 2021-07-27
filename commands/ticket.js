const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const catergoryID = "868138224218947664";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {
        
        if(channel.name == userName.toLowerCase() + "-" + userDiscriminator){
            ticketBestaat = true;

            message.reply("U heeft al een ticket!");

            return;
        }


    });

    if(ticketBestaat) return;

    var embed = new Discord.MessageEmbed()
        .setTitle("Ticket")
        .setColor("#ff6f00")
        .setDescription("Uw ticket word aangemaakt!")
        .setFooter("Flevoland")
        .setTimestamp();

    message.channel.send(embed);

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, {type: 'text'}).then(
        (createdChannel) => {
            createdChannel.setParent(catergoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'),{
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id,{
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSGAES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    var emedParent = new Discord.MessageEmbed()
                        .setTitle("Flevoland")
                        .setDescription("Dit is een ticket, deze informatie word prive gehouden.")
                        .addFields(
                            {name: "Gebruiker", value: message.author.tag}
                        )
                        .setColor("#ff6f00")
                        .setFooter("Flevoland")
                        .setTimestamp();

                    settedParent.send(emedParent);

                }
            ).catch(err => {
                message.channel.send("Er is iets fout gegaan!");
            });
        }
    ).catch(err => {
        message.channel.send("Er is iets fout gegaan!");
    });

}

module.exports.help = {
    name: "new"
}