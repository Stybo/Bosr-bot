const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const amountStars = args[0];

    var embed1 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Geef een aantal op tussen de 1 en 5 sterren`);

    var embed2 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Kanaal bestaat niet`);

    if (!amountStars || amountStars < 1 || amountStars > 5) return message.reply(embed1).then(msg => msg.delete({ timeout: 5000 }));

    var text = args.splice(1, args.length).join(" ") || `**Geen tekst opgegeven**`;

    var channel = message.member.guild.channels.cache.get("846451841877147729");

    if (!channel) return message.channel.send(embed2).then(msg => msg.delete({ timeout: 5000 }));

    var stars = "";
    for (let i = 0; i < amountStars; i++) {

        stars += ":star: ";


    }

    message.delete();

    const embed = new discord.MessageEmbed()
        .setTitle(`${message.author.username} heeft een review geschreven`)
        .setThumbnail(message.author.displayAvatarURL())
        .setColor('#0d0041')
        .addField("Sterren: ", stars)
        .addField("Bericht: ", text);

    var embed3 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} ✅ Je hebt succesvol een review geschreven`);
    
    message.channel.send(embed3).then(msg => msg.delete({ timeout: 5000 }));

    return channel.send(embed);




}

module.exports.help = {
    name: "review"
}