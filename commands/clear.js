const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    // !clear aantal

    var embed1 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Jij hebt geen rechten om dit te doen.`)

    var embed2 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Geef een aantal op.`)

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embed1).then(msg => msg.delete({ timeout: 5000 }));

    if (!args[0]) return message.channel.send(embed2).then(msg => msg.delete({ timeout: 5000 }));

    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            var embed4 = new discord.MessageEmbed()
                .setColor('#0d0041')
                .setDescription(`${message.author} Ik kan toch geen 0 berichten verwijderen? ;)`)

            var embed5 = new discord.MessageEmbed()
                .setColor('#0d0041')
                .setDescription(`${message.author} Ik heb 1 bericht verwijderd`)

            var embed6 = new discord.MessageEmbed()
                .setColor('#0d0041')
                .setDescription(`${message.author} Ik heb ${args[0]} bericht verwijderd`)


            if (args[0] <= 0) {
                return message.channel.send(embed4).then(msg => msg.delete({ timeout: 5000 }));
            } else if (args[0] == 1) {
                return message.channel.send(embed5).then(msg => msg.delete({ timeout: 5000 }));
            } else {
                return message.channel.send(embed6).then(msg => msg.delete({ timeout: 5000 }));
            }

        })



    } else {

        var embed7 = new discord.MessageEmbed()
            .setColor('#0d0041')
            .setDescription("Geef een getal op.")
        return message.channel.send(embed7).then(msg => msg.delete({ timeout: 5000 }));
    }

}

module.exports.help = {
    name: "clear"
}