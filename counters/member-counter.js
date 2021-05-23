module.exports = async (client) =>{
    const guild = client.guilds.cache.get('830213668397776896');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('845806619258257488');
        channel.setName(`Aantal leden: ${memberCount.toLocaleString()}`);
        console.log('Updating Member Count');
    }, 10000);
}
 