exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
    if (!args || args.length < 1) return message.channel.send("Must provide a command to reload. Derp.");

    response = client.loadCommand(args[0]);
    if (response) return message.channel.send(`Error Loading: ${response}`);

    message.channel.send(`The command \`${args[0]}\` has been loaded`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "load",
    category: "Admin",
    description: "Loads a command.",
    usage: "load [command]"
};