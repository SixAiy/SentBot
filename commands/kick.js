exports.run = async (client, msg, [mention, ...reason]) => {
	
    if (msg.mentions.members.size == 0 ) return msg.reply("Please mention a user to kick");
    if (!msg.guild.me.hasPermission("KICK_MEMBERS")) return msg.reply("You dont have the permission to kick the user");
	
    const kickMember = msg.mentions.members.first() || msg.author.id;
	
	if (client.config.owner.includes(msg.author.id)) {
		kickMember.kick(reason.join(" ")).then(member => {
			msg.reply(`${member.user.username} was succesfully kicked.`);
		});
	} else {
		kickMember.kick(reason.join(" ")).then(member => {
			msg.reply(`${member.user.username} was succesfully kicked.`);
		});
	}
};


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Administrator"
};

exports.help = {
    name: "kick",
    category: "Moderation",
    description: "Kick anyone from your discord",
    usage: "kick"
};