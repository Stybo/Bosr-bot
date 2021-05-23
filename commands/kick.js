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

    if (!args[1]) return message.channel.send(embed3).then(msg => msg.delete({ timeout: 5000 }));

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

    var reason = args.slice(1).join(" ");

    var embed4 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Kan de gebruiker niet vinden.`)

    var embed5 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Sorry je kunt deze gebruiker niet warnen`)

    if (!kickUser) return message.channel.send(embed4).then(msg => msg.delete({ timeout: 5000 }));

    if (kickUser.hasPermission("KICK_MEMBERS")) return message.channel.send(embed5).then(msg => msg.delete({ timeout: 5000 }));

    var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setThumbnail(kickUser.user.displayAvatarURL)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`** Gekickt:** ${kickUser} (${kickUser.id})
        **Gekickt door:** ${message.author}
        **Reden: ** ${reason}`);

    var embedPrompt = new discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor("Gelieve te reageren binnen 30 sec.")
        .setDescription(`Wil je ${kickUser} kicken?`);


    message.channel.send(embedPrompt).then(async msg => {

        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);


        if (emoji === "✅") {

            msg.delete();

            kickUser.kick(reason).catch(err => {
                if (err) return message.channel.send(`Er is iets foutgegaan.`).then(msg => msg.delete({ timeout: 3000 }));
            });

            message.reply(embed);

        } else if (emoji === "❌") {

            msg.delete();

            message.reply("Kick geanuleerd").then(msg => msg.delete({ timeout: 3000 }));

        }

    });
}

async function promptMessage(message, author, time, reactions) {

    time *= 1000;

    for (const reaction of reactions) {
        await message.react(reaction);
    }


    const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;


    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
}


module.exports.help = {
    name: "kick"
}