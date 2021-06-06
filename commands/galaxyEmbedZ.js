const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Galxy Muismat (Zwart)")
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
        .setImage('https://cdn.discordapp.com/attachments/841371133264658474/851042458020216842/Galaxy_illustration_zwart_webshop.png')

    return message.channel.send(botEmbed);
}
module.exports.help = {
    name: "galaxyEmbedZ"
}