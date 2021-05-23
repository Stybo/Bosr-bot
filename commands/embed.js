const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Een titel")
        .setDescription("Zet een beschrijvng")
        .setColor("#0d0041");

    return message.channel.send(botEmbed);
}
module.exports.help = {
    name: "embed"
}