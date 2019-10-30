exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
    function shutdown() {
        process.exit(1);
    }
    client.commands.forEach(async cmd => {
        await client.unloadCommand(cmd);
    });
    await message.channel.send("I will be right back!")
    await client.destroy();
    setTimeout(shutdown, 1000);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Staff"
};

exports.help = {
    name: "reboot",
    category: "Admin",
    description: "Shuts down the bot. If running under PM2, bot will restart automatically.",
    usage: "reboot"
};