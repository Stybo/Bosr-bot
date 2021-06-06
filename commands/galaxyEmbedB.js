const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Galxy Muismat (Blauw)")
        .setDescription(`**Prijs:** 
        €26,99
        
        **Grootte:**
        900 x 400 x 4mm
        
        **Kenmerken:**
        Polyester (Bovenkant)
        Antislip & milieuvriendelijk rubber (onderzijde)
        Gestikte randen
        Machinewasbaar (koud)`)
        .setColor("#0d0041")
        .setImage('https://cdn.discordapp.com/attachments/841371133264658474/851042455246602260/Galaxy_illustration_blauw_webshop.png')
        .addField("Link", "[Galxy Muismat (Blauw)](https://bosr.nl/product/galaxy-muismat-blauw/)")
    return message.channel.send(botEmbed);
}
module.exports.help = {
    name: "galaxyEmbedB"
}