const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const memberCounter = require("./counters/member-counter");

// Command handler
const fs = require("fs");

const client = new discord.Client();


// Command handler
client.commands = new discord.Collection();


client.login(process.env.token);


// Command handler
fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        client.commands.set(fileGet.help.name, fileGet);
    });

});


client.on("guildMemberAdd", member => {
    var channel = member.guild.channels.cache.get('841335369936535602');

    if (!channel) return;

    var memberCount = member.guild.memberCount;

    var joinEmbed = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setTitle(`Welkom ${member.user.username}`)
        .setDescription(`Welkom in de Bosr Discord server.
        We zijn nu met ${memberCount} Members.`)
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter("Bosr")
        .setTimestamp();

    channel.send(joinEmbed);

    var joinEmbed1 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setTitle(`Welkom ${member.user.username}`)
        .setDescription(`Welkom in de Bosr Discord server. \n\n Om er voor te zorgen dat jouw ervaring op de server optimaal is, moet je de regels nog even doorlezen. \n\n Als je dat hebt gedaan kun je jezelf verifiëren door op het ✅ te klikken, en dan ben je klaar om te gaan!!`)
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter("Bosr")
        .setTimestamp();

    member.send(joinEmbed1)

    try {
        member.send();
    } catch (e) {
        return;
    }

})



client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);
    memberCounter(client);

    client.user.setActivity("!help", { type: "PLAYING" });

});

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;


    var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));

    var msg = message.content.toLowerCase();

    var embed1 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Dat woord hoort hier niet thuis`)

    for (let i = 0; i < swearWords["vloekwoorden"].length; i++) {

        if (msg.includes(swearWords["vloekwoorden"][i])) {


            message.delete();

            return message.channel.send(embed1).then(msg => msg.delete({ timeout: 5000 }));
        }

    }

    var ID = "846451841877147729"
    var ID1 = "841674068532396122"
    var ID2 = "841599442893275138"

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (message.channel.id == ID) message.delete({ timeout: 5000 });
    if (message.channel.id == ID1) message.delete({ timeout: 5000 });
    if (message.channel.id == ID2) message.delete({ timeout: 5000 });

    if (!message.content.startsWith(prefix)) return;

    // Command handler
    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, arguments);

});

client.on("messageDelete", messageDeleted => {
    var logChannel = client.channels.cache.get("841591393981562891")

    if (messageDeleted.author.bot) return;

    var content = messageDeleted.content;
    if (!content) content = "Geen tekst te vinden";
    //(MessageDeletedEmbed)

    var MessageDeletedEmbed = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`Geen tekst te vinden`)
        .setFooter("© Bosr")
        .setTimestamp();

    var respone = `Er is een bericht verwijderd uit ${messageDeleted.channel}\n \n **Bericht**: ${content}`;

    var MessageDeletedEmbed1 = new discord.MessageEmbed()
        .setAuthor(`${messageDeleted.author.tag}    ID: ${messageDeleted.author.id}`, `${messageDeleted.author.avatarURL({ size: 4096 })}`)
        .setTitle("Verwijderd bericht")
        .setDescription(respone)
        .setTimestamp()
        .setColor('#0d0041');

    logChannel.send(MessageDeletedEmbed1);
});

client.on("messageUpdate", async(oldMessage, newMessage) => {
    var respone = `Er is een bericht bewerkt in ${oldMessage.channel}\n \n **Oud bericht**: ${oldMessage}\n**Nieuw bericht**: ${newMessage}`

    var logChannel = client.channels.cache.get("841591393981562891")

    var editEmbed = new discord.MessageEmbed()
        .setAuthor(`${oldMessage.author.tag}    ID: ${oldMessage.author.id}`, `${oldMessage.author.avatarURL({ size: 4096 })}`)
        .setTitle("Bewerkt bericht")
        .setDescription(respone)
        .setTimestamp()
        .setColor('#0d0041');
    logChannel.send(editEmbed);
});