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

    // channel.send(`Welkom bij de server ${member}`);

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

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    // var sentenceUser = "";
    // var amountSwearWords = 0;

    // for (let y = 0; y < messageArray.length; y++) {
       
    //     const word = messageArray[y].toLowerCase();

    //     var changeWord = "";

    //     for (let i = 0; i < swearWords["vloekwoorden"].length; i++) {

    //         if (word.includes(swearWords["vloekwoorden"][i])) {

    //             changeWord = word.replace(swearWords["vloekwoorden"][i], "******");

    //             sentenceUser += " " + changeWord;

    //             amountSwearWords++;
                
    //         }

    //     }

    //     if(!changeWord){
    //         sentenceUser+= " " + messageArray[y];
    //     }        

        
    // }

    // if(amountSwearWords != 0){

    //     message.delete();
    //     message.channel.send(sentenceUser)



    // }



    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    // Command handler
    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, arguments);

});
