const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const categoryID = "841732329692332032";

    var embed = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Jij kunt dit niet doen.`);

    var embed1 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Gelieve dit commando te doen bij een ticket.`)

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }));

    if (message.channel.parentID == categoryID) {
        message.channel.delete();

        var embed2 = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setColor('#0d0041')
            .setDescription(`Het ticket is gemarkeerd als **compleet**.`)
            .setFooter("Ticket gesloten")
            .setTimestamp();

        var embed3 = new discord.MessageEmbed()
            .setColor('#0d0041')
            .setDescription(`${message.author} Kanaal bestaat niet.`);

        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "log");
        if (!ticketChannel) return message.reply(embed3);

        ticketChannel.send(embed2);


    } else {

        message.channel.send(embed1);
    }

}

module.exports.help = {
    name: "close"
}