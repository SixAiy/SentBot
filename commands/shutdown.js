exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
    await message.reply("Bot is shutting down.");
    process.kill(process.pid);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "shutdown",
    category: "Admin",
    description: "Shuts down the bot.",
    usage: "shutdown"
};