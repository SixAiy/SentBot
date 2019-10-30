exports.run = async (client, msg, args) => {
    msg.channel.send(`Invite link for **${client.user.username}:** <https://sixaiy.com/bot>`);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "invite",
    category: "Miscelaneous",
    description: "Displays the invite link",
    usage: "invite"
};