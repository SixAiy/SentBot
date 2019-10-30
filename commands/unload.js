exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars

    try {
        if (!args || args.length < 1) return message.channel.send("Must provide a command to reload. Derp.");

        let response = await client.unloadCommand(args[0]);
        if (response) return message.channel.send(`Error Unloading: ${response}`);

        message.channel.send(`The command \`${args[0]}\` has been unloaded`);
    } catch (err) {
        client.channels.get("609805505933606952").send(`${msg.guild.name} (${msg.guild.id})\n \`\`\`${err.stack}\`\`\``);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "unload",
    category: "Admin",
    description: "Unload a command.",
    usage: "unload [command]"
};