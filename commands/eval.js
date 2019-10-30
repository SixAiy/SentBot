exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars
    const code = args.join(" ");
    try {
        const evaled = eval(code);
        const clean = await client.clean(client, evaled);
        msg.channel.send(`:outbox_tray:**Output:**\`\`\`js\n${clean}\n\`\`\``);
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
    name: "eval",
    category: "Admin",
    description: "Evaluates arbitrary javascript.",
    usage: "eval [...code]"
};