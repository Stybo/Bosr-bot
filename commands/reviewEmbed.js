const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Hoe schrijf je een review?")
        .setDescription("Doe !review (Aantal sterren {1-5}) (Bericht)")
        .setThumbnail("https://media.discordapp.net/attachments/841371133264658474/841743658269278238/Logo_site.png")
        .setColor("#0d0041");

    return message.channel.send(botEmbed);
}

module.exports.help = {
    name: "reviewEmbed"
}