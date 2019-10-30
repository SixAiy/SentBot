const Discord = require('discord.js');
const moment = require('moment-timezone');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	try {

    const embed = new Discord.RichEmbed()
        .setColor(this._color)
        .setThumbnail(this._icon)
        .setAuthor(message.guild.name, `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
        .setDescription(`
            \`${message.guild.memberCount}\` members | \`${message.guild.members.filter((member) => ['online', 'idle', 'dnd'].includes(member.user.presence.status)).size}\` online | \\🤖 \`${message.guild.members.filter(m => m.user.bot).size}\` bots

            **Owner:** ${message.guild.owner.user.tag}
            **Created:** ${moment(message.guild.createdAt).tz('America/Denver').format("dddd, MMMM Do YYYY, h:mm:ss a z")}
            **Region:**  \`${message.guild.region.toUpperCase()}\`
            **Security:**  \`${message.guild.verificationLevel}\`
        `
        )
        .addField('Extra Info', `\`${message.guild.channels.size}\` channels (\`${message.guild.channels.filter(t => t.type === 'voice').size}\` voice) | \`${message.guild.roles.size}\` roles | \`${message.guild.emojis.size}\` emojis`)
        .setFooter(`ID: ${message.guild.id}`)
        .setTimestamp()
    message.channel.send({ embed })
	} catch(err) { message.channel.send(`\`\`\`${err.stack}\`\`\``); }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "serverinfo",
    category: "Miscelaneous",
    description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
    usage: "serverinfo"
};