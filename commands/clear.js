exports.run = async (client, message, args, level) => {
    try {
        /*let messages = await channel.fetchMessages({limit: 100})
        messages = messages.filter(client.user.id);
        channel.bulkDelete(messages.array().reverse());*/

        async function purge(number) {
            message.delete();

            const fetched = await message.channel.fetchMessages({ limit: number });

            message.channel.bulkDelete(fetched)
                .then(m => message.channel.send(`${fetched.size} messages deleted`).then(async m => await m.delete([300])))
                .catch(err => msg.channel.send(`\`\`\`${err.stack}\`\`\``));
        };

        if (args[0]) {
            purge(args[0]);
        } else {
            purge(100);
        }
    } catch (err) {
        msg.channel.send(`\`\`\`${err.stack}\`\`\``));
    }
};
        
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Administrator"
};

exports.help = {
    name: "clear",
    category: "Moderation",
    description: "Cleans up the bots own posts",
    usage: "clear"
};