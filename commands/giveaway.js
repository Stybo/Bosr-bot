const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var item = "";
    var time;
    var winnerCount;

    var embed1 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Jij hebt geen rechten om dit te doen`);

    var embed2 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Geen aantal spelers opgegeven`);

    var embed3 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Geen tijd opgegeven`);

    var embed4 = new discord.MessageEmbed()
        .setColor('#0d0041')
        .setDescription(`${message.author} Geen winnaars opgegeven`);


    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embed1).then(msg => msg.delete({ timeout: 5000 }));

    winnerCount = args[0];
    time = args[1];
    item = args.splice(2, args.length).join(" ");

    if (!winnerCount) return message.channel.send(embed2).then(msg => msg.delete({ timeout: 5000 }));
    if (!time) return message.channel.send(embed3).then(msg => msg.delete({ timeout: 5000 }));
    if (!item) return message.channel.send(embed4).then(msg => msg.delete({ timeout: 5000 }));

    message.delete();

    var date = new Date().getTime();
    var dateEnd = new Date(date + (time * 1000));

    var embedGiveaway = new discord.MessageEmbed()
        .setTitle("🎉 **GIVEAWAY** 🎉")
        .setFooter(`Vervalt: ${dateEnd}`)
        .setColor('#0d0041')
        .setDescription(item);

    var embedSend = await message.channel.send(embedGiveaway);
    embedSend.react("🎉");

    setTimeout(function () {

        var random = 0;
        var winners = [];
        var inlist = false;

        var peopleReacted = embedSend.reactions.cache.get("🎉").users.cache.array();

        for (let i = 0; i < peopleReacted.length; i++) {

            if (peopleReacted[i].id == client.user.id) {
                peopleReacted.splice(i, 1);
                continue;
            }

        }

        var embed5 = new discord.MessageEmbed()
            .setColor('#0d0041')
            .setDescription(`Niemand heeft meegedaan dus de bot wint.`);

        var embed6 = new discord.MessageEmbed()
            .setColor('#0d0041')
            .setDescription(`Er hebben te weinig mensen meegedaan dus de bot wint.`);

        if (peopleReacted.length == 0) {
            return message.channel.send(embed5);
        }

        if (peopleReacted.length < winnerCount) {
            return message.channel.send(embed6);
        }

        for (let y = 0; y < winnerCount; y++) {

            inList = false;

            random = Math.floor(Math.random() * peopleReacted.length);

            for (let o = 0; o < winners.length; o++) {

                if (winners[o] == peopleReacted[random]) {
                    inlist = true
                    y--;
                    break;
                }

            }

            if (!inList) {
                winners.push(peopleReacted[random]);
            }

        }

        for (let y = 0; y < winners.length; y++) {

            var embed7 = new discord.MessageEmbed()
                .setColor('#0d0041')
                .setDescription(`Gefeliciteerd: ${winners} Je hebt een ${item} gewonnen 🥳`)

            message.channel.send(embed7)

        }

    }, time * 1000)


}

module.exports.help = {
    name: "giveaway"
}