const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var embed = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Kanaal niet gevonden`);

    var embed1 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Gelieve een suggestie mee te geven`);

    const channel = message.guild.channels.cache.find(ch => ch.name === "💡・suggesties");
    if (!channel) return message.reply(embed2)

    var argsBericht = args.join(" ");
    if (!argsBericht) return message.reply(embed1)

    var embed2 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(argsBericht)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

    channel.send(embed2).then(async (msg) => {
        await msg.react("✅")
        await msg.react("❌")
        message.delete();
    }).catch(err => {
        console.log(err);
    });

}

module.exports.help = {
    name: "suggestie"
}