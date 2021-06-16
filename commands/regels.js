const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("**Welkom!  :wave:**")
        .setDescription(`**Hey, welkom op de community Discord van Bosr!

        Toegang krijgen tot deze server is simpel. Zorg ervoor dat je de regels hier onderaan leest en vervolgens op het vinkje :white_check_mark: drukt om toegang te krijgen.**`)
        .setColor("#0d0041")
        .setThumbnail('https://media.discordapp.net/attachments/841371133264658474/841743658269278238/Logo_site.png')
        
    return message.channel.send(botEmbed);
}
module.exports.help = {
    name: "regels"
}