const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const categoryID = "841732329692332032";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var ticketBestaat = false;

    var embed = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Je hebt al een ticket aangemaakt`);

    message.guild.channels.cache.forEach(channel => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            ticketBestaat = true;

            message.reply(embed).then(msg => msg.delete({ timeout: 5000 }));

        } return;

    });

    if (ticketBestaat) return;

    var embed1 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Support kanaal wordt aangemaakt`);

    message.channel.send(embed1)

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, { type: 'text' }).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id, {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true,
                        ATTATCH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true
                    });

                    var embedParent = new discord.MessageEmbed()
                        .setTitle(`🎫| Ticket ${message.author.username}`)
                        .setColor('#0d0041')
                        .setFooter("Bosr")
                        .setTimestamp()
                        .addFields(
                            { name: '♻️| Status', value: 'Open' },
                            { name: '👤| Ticket eigenaar', value: `${message.author.username}` })
                    // { name: '✉️| Reden', value: `{reason}` },
                    // { name: '📯| Support', value: "@84504216877504929" }

                    settedParent.send(embedParent);

                }
            ).catch(err => {
                var embed2 = new discord.MessageEmbed()
                    .setColor('#0d0041')
                    .setDescription(`${message.author} Er is iets fout gegaan`);
                message.channel.send(embed2);
            });
        }
    ).catch(err => {
        var embed2 = new discord.MessageEmbed()
            .setColor('#0d0041')
            .setDescription(`${message.author} Er is iets fout gegaan`);
        message.channel.send(embed2);
    });

}

module.exports.help = {
    name: "ticket"
}