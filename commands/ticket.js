exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    try {
        if (!args[0]) {
            message.channel.send(`Welcome to the SAN Ticket System, if you are new to this, create a ticket by using \`${message.settings['prefix']}ticket new <your message>\` you can create a new ticket\nIf you have a ticket open and you want to close your ticket type \`${message.settings['prefix']}ticket close\``)
        }
        if (args[0] == 'new') {

            const reason = message.content.split(' ').slice(2).join(' ');
            client.channels.get("617110537368633384").send(`**New Ticket!**\nTN: \`${message.author.id}\`\nGID: \`${message.guild.id}\`\n${reason}
`);
            message.channel.send('Your ticket has been created, A member of the Support team will contact you with in the next 24 hours!');

        } else if (args[0] == 'close') {
            const supchan = client.channels.get("617110537368633384")
            supchan.fetchMessages()
                .then(msg => {
                    msg.map(m => {
                        if (m.content.includes(message.author.id)) {
                            m.edit(`${message.author.tag} closed their ticket TN: ${message.author.id}`);
                        }
                    })
                })
            message.channel.send(`Your ticket has been closed!`)
        }
    } catch (err) {
        client.channels.get("609805505933606952").send(`${msg.guild.name} (${msg.guild.id})\n \`\`\`${err.stack}\`\`\``);
    }
   
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "ticket",
    category: "Miscelaneous",
    description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
    usage: "ticket"
};