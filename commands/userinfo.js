const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (client, msg, args, level) => {
    try {
		let infomember = client.users.get(args);
		const infouser = infomember;
			   
		const usercreated_date = moment(infouser.createdTimestamp).format("DD-MM-YYYY HH:mm:ss");
		const userjoining_date = moment(infomember.joinedTimestamp).format("DD-MM-YYYY HH:mm:ss");
		const e = new Discord.RichEmbed()
		   .setColor(infomember.displayHexColor)
		   .setAuthor(infomember.displayName || infomember.username + " Information", infouser.displayAvatarURL)
		   .setTitle("DiscordTag: " + infouser.tag + " | ID: " + infouser.id)
		   .addBlankField()
		   .addField("**Account created: **", usercreated_date, true)
		   .addField("**Joined date: **", userjoining_date, true)
		   .addBlankField()
		   .addField("**Avatar url:**", infouser.displayAvatarURL)
		   .setFooter(AskedBy_EmbedFooter(ctx.opts.evt.author))
		   .setTimestamp();
		msg.channel.send({ embed: e });
    } catch (err) {
		message.channel.send(`\`\`\`${err.stack}\`\`\``);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "userinfo",
    category: "Music",
    description: "Change the userinfo of the bot",
    usage: "userinfo <usr>"
};