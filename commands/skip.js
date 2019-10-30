exports.run = async (client, msg, args, level) => {
    client.skipSong(msg, client.getQueue(msg.guild.id));
    return;
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["s"],
    permLevel: "User"
};

exports.help = {
    name: "skip",
    category: "Music",
    description: "Skip a song of your choice!.",
    usage: "skip or s"
};