const _ = require('lodash');

exports.run = async (client, message, args, level) => {
    if (!args[0]) {
        let TempPageIndex = 0;
        const guilds = client.guilds.map(g => g)
        const guildsPerPage = 20;
        let pages;
        let pageSize = Math.ceil(client.guilds.size / 20);

        pages = _.chunk(guilds, guildsPerPage);
        pages = pages.map((servers) => {
            let desc = servers.map(g => `\`[${g.id}]\`: \`${g.name}\``).join('\n');
            TempPageIndex = TempPageIndex + 1;
            return {
                embed: {
                    color: 0xff4500,
                    author: {
                        name: `Current Guilds Listed for ${client.user.username}`,
                        icon_url: client.user.avatarURL
                    },
                    description: `Page **${TempPageIndex}** of **${pageSize}**\n\n${desc}`,
                    footer: {
                        text: `There are ${client.guilds.size.toLocaleString()} guilds listed for ${client.user.username}`
                    }
                }
            }
        })
        message.channel.send(pages[0])
            .then(async (msg) => {
                if (pages === 1) {
                    await msg.react('🇽');
                }
                await msg.react('⬅');
                await msg.react('➡');
                await msg.react('🇽');
                const collector = msg.createReactionCollector((buttons, user) => user !== client.user);

                let pageIndex = 0;

                collector.on('collect', async (messageReaction) => {

                    const notbot = messageReaction.users.filter(clientuser => clientuser !== client.user).first();
                    await messageReaction.remove(notbot);

                    if (messageReaction.emoji.name === '⬅') {

                        msg.edit(pages[pageIndex--]);

                    } else if (messageReaction.emoji.name === '➡') {

                        msg.edit(pages[pageIndex++]);

                    } else if (messageReaction.emoji.name === '🇽') {

                        msg.delete(); // Delete the message
                        collector.stop(); // Delete the collector.
                        return;

                    }
                })
            }).catch(err => msg.channel.send(`\`\`\`${err.stack}\`\`\``));
    } else if(args[0] === 'leave') {
        if (!args[1]) {
            message.channel.send("Please add the guild ID like this `..guild leave <GUIDID>`")
        } else {
            client.guilds.get(args[1]).leave()
                .then(g => message.channel.send(`:ok_hand: i left \`${g.name}\``))
                .catch(err => msg.channel.send(`\`\`\`${err.stack}\`\`\``));
        }
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["g"],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "guild",
    category: "Admin",
    description: "Displays all the available commands for your permission level.",
    usage: "guild leave"
};