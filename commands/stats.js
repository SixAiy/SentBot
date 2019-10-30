const { version } = require('discord.js');
const Lavalink = require('discord.js-lavalink');
const moment = require('moment');
exports.run = async (client, msg, args) => {

    var startDate = moment(Date.now() - client.uptime).format("MMM Do YY")

    function getYTLive(millisec) {
        // Credit: https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
        var seconds = (millisec / 1000).toFixed(0);
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }
        // Normally I'd give notes here, but I actually don't understand how this code works.
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        if (hours != "") {
            return hours + "hr " + minutes + " mins " + seconds + " secs";
        }
        return minutes + " mins " + seconds + " secs";
    }
    try {
        msg.channel.send({
            embed:
            {
                color: 0xbe3e99,
                author: {
                    name: '',
                    icon_url: client.user.avatarURL
                },
                footer: {
                    text: `${client.user.username}: v${client.config.version} | Distribution: ${client.user.username}`
                },
                description: `
**Uptime**: \`${getYTLive(client.uptime)}\`
**Started**: \`${startDate.toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}\`

**Total Memory**: \`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB\`
**Memory Used**: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\`
**Free Memory**: \`${((process.memoryUsage()['rss'] - process.memoryUsage()['heapUsed']) / 1024 / 1024).toFixed(2)}MB\`

**Shards**: \`${client.shard.count.toLocaleString()}\`
**Players**: \`${client.player.size.toLocaleString()}\`
**Listeners**: \`${client.player.filter(m => m.playing && m.voiceChannel).reduce((a, b) => b.voiceChannel.members.size + a, 0).toLocaleString()}\`
**Servers**: \`${client.guilds.size.toLocaleString()}\`

**Lavaplayer**: \`v${Lavalink.version}\`
**Discord.js**: \`v${version}\`
**Nodejs**: \`${process.version}\`
			`
            }
        });
    } catch (err) {
        client.channels.get("609805505933606952").send(`${msg.guild.name} (${msg.guild.id})\n \`\`\`${err.stack}\`\`\``);
    }
	
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "stats",
    category: "Miscelaneous",
    description: "Gives some useful bot statistics",
    usage: "stats"
};