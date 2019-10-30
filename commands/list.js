const reactions = require('../core/reactions');
const _ = require('lodash');

exports.run = async (client, message, args, level) => {
    let TempPageIndex = 0;
    const queue = client.getQueue(message.guild.id);
    const songsPerPage = 20;
    let pages;
    let pagesSize = Math.ceil(queue.length / 20);

	if(queue.length < 1) message.channel.send(`Nothing in queue D:`);
    pages = _.chunk(queue, songsPerPage);
    pages = pages.map((page) => {
        let index = 0;
        let desc = page.map(track => `\`[${++index}]\` **${track.info.title}** added by **${track.requester.username}** \`[${client.getYTLive(track.info.length)}]\``).join("\n");
        TempPageIndex = TempPageIndex + 1;
        return `Page **${TempPageIndex}** of **${pagesSize}**

${desc}

There are **${Math.ceil(queue.length)}** tracks with a remaining length of **[${client.getYTLive(queue.reduce((a, b) => a + b.info.length, 0))}]** in the queue.	
`
    });

    message.channel.send(pages[0]);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["l", "list", "q", "queue"],
    permLevel: "User"
};

exports.help = {
    name: "list",
    category: "Music",
    description: "Displays the current queue playing on the bot",
    usage: "list"
};