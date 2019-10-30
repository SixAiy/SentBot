const Discord = require('discord.js');

exports.run = async (client, msg, level) => {

    const serverQueue = client.getQueue(msg.guild.id);

    const em = new Discord.RichEmbed()
        .setAuthor(serverQueue.songs[0].ytname, serverQueue.songs[0].ytavatar, serverQueue.songs[0].yturl)
        .setDescription(`Now Playing: [${serverQueue.songs[0].title}](${serverQueue.songs[0].url})\nTime: ${serverQueue.songs[0].seconds}`)
        .setTimestamp()
        .setFooter(`Requested by` + serverQueue.songs[0].requester.tag, serverQueue.songs[0].requester.avatarURL)
    msg.channel.send(em);
        
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["now"],
    permLevel: "User"
};

exports.help = {
    name: "np",
    category: "Music",
    description: "Displays the current queue playing on the bot",
    usage: "np"
};