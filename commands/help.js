const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    try {

        var text = "**Bosr BOT** \n\n **__Commands__** \n !hallo - Geeft een hallo terug. \n !info - Geeft info.";

        message.author.send(text);

        message.reply("Alle commands kan je vinden in je prive berichten");

    } catch (error) {
        message.reply("Er is iets fout gegaan");
    }
}

module.exports.help = {
    name: "help2"
}