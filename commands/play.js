const YouTube = require('simple-youtube-api');
const { ytkey } = require("../core/config");
const yt = new YouTube(ytkey);

exports.run = async (client, msg, args) => {
    
    const serverQueue = client.getQueue(msg.guild.id);

    if (!msg.member.voiceChannel) return msg.channel.send('You need to be in a voice channel before trying to play a song!');
	if (!msg.member.guild.me.hasPermission("VIEW_CHANNEL") && !msg.member.guild.me.hasPermission("SPEAK") && !msg.member.guild.me.hasPermission("CONNECT")) return msg.channel.send("I dont have `SPEAK`, `CONNECT` or `VIEW_CHANNEL` Permissions to join this channel")
    if (args[0] == undefined) return msg.channel.send(`Use the following to play a song: ${prefix}play < url - or - search - terms >`);

    if (['https://', 'http://'].some(crx => args.join(' ').includes(crx))) {
        client.executeSong(args[1], msg, serverQueue);
        return;
    } else {
        const vids = await yt.searchVideos(args[1], 5);
        let index = 0;

        msg.channel.send(`
**Search Results**
\`Please select a track with the Emojis/reactions\`
${vids.map(vids2 => `**${++index}:** ${vids2.title} ${vids2.time}`).join('\n')}
`)
            .then(async m => {
                await m.react('1⃣');
                await m.react('2⃣');
                await m.react('3⃣');
                await m.react('4⃣');
                await m.react('5⃣');
                await m.react('🇽');

                const collector = m.createReactionCollector((buttons, user) => user !== client.user);
                collector.on('collect', messageReaction => {
                    if (messageReaction.emoji.name == '1⃣') {
                        client.executeSong(vids[0].id, msg, serverQueue);
                        m.delete(0);
                    } else if (messageReaction.emoji.name == '2⃣') {
                        client.executeSong(vids[1].id, msg, serverQueue);
                        m.delete(0);
                    } else if (messageReaction.emoji.name == '3⃣') {
                        client.executeSong(vids[2].id, msg, serverQueue);
                        m.delete(0);
                    } else if (messageReaction.emoji.name == '4⃣') {
                        client.executeSong(vids[3].id, msg, serverQueue);
                        m.delete(0);
                    } else if (messageReaction.emoji.name == '5⃣') {
                        client.executeSong(vids[4].id, msg, serverQueue);
                        m.delete(0);
                    } else if (messageReaction.emoji.name == '🇽') {
                        m.delete(0);
                    }
                });
            });
	}
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['p'],
    permLevel: "User"
};

exports.help = {
    name: "play",
    category: "Music",
    description: "play music from youtube, soundcloud or other places including https streams!",
    usage: "play <url|name>"
};
