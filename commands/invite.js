exports.run = async (client, msg, args) => {
    msg.channel.send(`Invite link for **${client.user.username}:** <https://discordapp.com/oauth2/authorize?&client_id=${client.user.id}&scope=bot&permissions=305261958>`);
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