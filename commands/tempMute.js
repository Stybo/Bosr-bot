const discord = require("discord.js");

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

    var mutePerson = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

    var embed4 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Kan de gebruiker niet vinden.`)

    var embed5 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Sorry je kunt deze gebruiker niet muten`)

    if (!mutePerson) return message.channel.send(embed4).then(msg => msg.delete({ timeout: 5000 }));

    if (mutePerson.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embed5).then(msg => msg.delete({ timeout: 5000 }));



}

module.exports.help = {
    name: "tempmute"
}