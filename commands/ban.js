exports.run = async (client, msg, args) => { 
    try {
        const user = msg.mentions.users.first(); // returns the user object if an user mention exists
        const banReason = args.slice(1).join(' '); // Reason of the ban (Everything behind the mention)

        // Check if an user mention exists in this message
        if (!user) {
            try {
                // Check if a valid userID has been entered instead of a Discord user mention
                if (!msg.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Couldn\' get a Discord user with this userID!');
                // If the client (bot) can get a user with this userID, it overwrites the current user variable to the user object that the client fetched
                user = msg.guild.members.get(args.slice(0, 1).join(' '));
                user = user.user;
            } catch (error) {
                return msg.reply('Couldn\' get a Discord user with this userID!');
            }
        }
        if (user === msg.author) return msg.channel.send('You can\'t ban yourself'); // Check if the user mention or the entered userID is the message author himsmelf
        if (!banReason) return msg.reply('You forgot to enter a reason for this ban!'); // Check if a reason has been given by the message author
        if (!msg.guild.member(user).bannable) return msg.reply('You can\'t ban this user because you the bot has not sufficient permissions!'); // Check if the user is bannable with the bot's permissions

        await msg.guild.ban(user) // Bans the user
    } catch (err) {
        client.channels.get("609805505933606952").send(`${msg.guild.name} (${msg.guild.id})\n \`\`\`${err.stack}\`\`\``);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["b"],
    permLevel: "Administrator"
};

exports.help = {
    name: "ban",
    category: "Moderation",
    description: "Ban a person from your guild/discord server.",
    usage: "ban @user"
};