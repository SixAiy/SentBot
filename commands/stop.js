exports.run = async (client, msg, args) => {
    client.stopSong(msg, client.getQueue(msg.guild.id));
    return;
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "stop",
    category: "Music",
    description: "Stops the current music",
    usage: "stop"
};