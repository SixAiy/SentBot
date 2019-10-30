exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-var
    try {
        const args = msg.content.split(' ').slice(1)[0];
        const player = client.player.get(msg.guild.id);
		const voiceChannel = client.player.get(msg.guild.id);
		let current = voiceChannel.state.volume;
        if (!player)
            return msg.channel.send("No music playing!");

        if (isNaN(args))
			return msg.channel.send(`Current volume at \`${current}%\` out of \`100%\``);

        const volume = parseInt(args);
        if (volume < 0 || volume > 100)
            return msg.channel.send(`Volume can't be below 0 or above 100!`);

        player.volume(volume);

        msg.channel.send(`Set the volume to ${volume}!`);
    } catch (err) {
		client.channels.get("609805505933606952").send(`${msg.guild.name} (${msg.guild.id})\n \`\`\`${err.stack}\`\`\``);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["v", "vol"],
    permLevel: "User"
};

exports.help = {
    name: "volume",
    category: "Music",
    description: "Change the volume of the bot",
    usage: "volume, vol, v"
};