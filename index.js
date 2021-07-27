const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection()

const snipes = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    let jsFile = files.filter(f => f.split(".").pop() === "js")
    if(jsFile.length <= 0){
        console.log("Geen commands gevonden");
        return;
    }

    jsFile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} Geladen!`);
    client.commands.set(props.help.name, props);
    });

});


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const {
    prefix,
} = require("./botconfig.json");
client.once('ready', () => {
    console.log('Bot gestart!');
    client.user.setActivity('Playing Flevoland!');
});

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;

    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client,message,args);
})


client.login(process.env.token);

client.on('guildMemberAdd', (member) => {

    var role = member.guild.roles.cache.get('868519386074447872');

    if (!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get('868519902464593980');

    if (!channel) return;

    var joinEmbed = new Discord.MessageEmbed()
        .setTitle("Flevoland")
        .setDescription(`Welkom! ${member.user.username}, in **Flevoland**!`)
        .setColor("#ff6f00")
        .setFooter("Flevoland")
        .setTimestamp();

    channel.send(joinEmbed);

});

client.on('guildMemberRemove', (member) => {

    var channel = member.guild.channels.cache.get('868526363701837914');

    if (!channel) return;

    var LeaveEmbed = new Discord.MessageEmbed()
        .setTitle("Flevoland")
        .setDescription(`${member.user.username} is **Geleaved**!`)
        .setColor("RANDOM")
        .setFooter("Flevoland")
        .setTimestamp();

    channel.send(LeaveEmbed);

});

client.on('messageDelete', (message) => {
    snipes.set(message.channel.id, message);

    const LogChannel = client.channels.cache.get('868526363701837914')
    const DeletedLog = new Discord.MessageEmbed()
    .setTitle("Deleted Message.")
    .addFields(
        {name: "Deleted door", value: message.author},
        {name: "In", value: message.channel},
        {name: "Bericht", value: message.content},
    )
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}));
    LogChannel.send(DeletedLog)
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
    const LogChannel = client.channels.cache.get('868526363701837914')
    const EdittedLog = new Discord.MessageEmbed()
    .setTitle("Eddited Message.")
    .addField("Eddited door", oldMessage.author, oldMessage.author.id)
    .addField("In", oldMessage.channel)
    .addField("Oud bericht", oldMessage.content)
    .addField("Niew bericht", newMessage.content)
    .setColor("RANDOM")
    .setThumbnail(oldMessage.author.displayAvatarURL({dynamic: true}));
    await LogChannel.send(EdittedLog)
}); 