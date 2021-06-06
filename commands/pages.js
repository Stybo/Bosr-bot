const discord = require("discord.js");
// const pagination = require(`discord.js-pagination`)

module.exports.run = async (bot, message, args) => {

    const page1 = new discord.MessageEmbed()
    .setTitle(`Pagina 1`)
    .setDescription(`voobeeld voor pagina 1`)

    const page2 = new discord.MessageEmbed()
    .setTitle(`Pagina 2`)
    .setDescription(`voobeeld voor pagina 2`)

    const page3 = new discord.MessageEmbed()
    .setTitle(`Pagina 3`)
    .setDescription(`voobeeld voor pagina 3`)

    const pages = [
        page1,
        page2,
        page3
    ]

    const emoji = ["◀", "▶"]

    const timeout = '100000'

    pagination(message, pages, emoji, timeout)
}

module.exports.help = {
    name: "help"
}