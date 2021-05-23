const discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    var embed1 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Jij hebt geen rechten om dit te doen`)

    var embed2 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Geef een gebruiker op.`)

    var embed3 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Geef een reden op.`)

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(embed1).then(msg => msg.delete({ timeout: 5000 }));

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(embed1).then(msg => msg.delete({ timeout: 5000 }));

    if (!args[0]) return message.channel.send(embed2).then(msg => msg.delete({ timeout: 5000 }));

    if (!args[1]) return message.channel.send(embed3).then(msg => msg.delete({ timeout: 5000 }));

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

    var reason = args.slice(1).join(" ");

    var embed4 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Kan de gebruiker niet vinden.`)

    var embed5 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Sorry je kunt deze gebruiker niet warnen`)

    if (!warnUser) return message.channel.send(embed4).then(msg => msg.delete({ timeout: 5000 }));

    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embed5).then(msg => msg.delete({ timeout: 5000 }));


    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    };

    warns[warnUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });

    var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`** Gewarned:** ${warnUser} (${warnUser.id})
        **Gewarned door:** ${message.author}
        **Reden: ** ${reason}`)
        .addField("Aantal warns", warns[warnUser.id].warns);

    var channel = message.member.guild.channels.cache.get("841591393981562891")

    if (!channel) return;

    channel.send(embed);

    if (warns[warnUser.id].warns == 3) {

        var embed = new discord.MessageEmbed()
            .setTitle(`PAS OP`)
            .setColor("#ff0000")
            .addField("Bericht", `${warnUser} Je hebt nog 1 waarschuwing voordat je een kick krijgt!`)

        message.channel.send(embed);

    } else if (warns[warnUser.id].warns == 4) {

        var embed4 = new discord.MessageEmbed()
            .setColor('#0d0041')
            .setDescription(`${warnUser} is gekickt door de bot wegens te veel warns`)

        message.guild.member(warnUser).kick({ reason: reason });;
        return message.channel.send(embed4).then(msg => msg.delete({ timeout: 5000 }));
    }
}

module.exports.help = {
    name: "warn"
}