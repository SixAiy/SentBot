const reactions = require('../core/reactions');
const _ = require('lodash');

exports.run = (client, message, args, level) => {
    if (!message.channel.permissionsFor(client.user).hasPermissions('EMBED_LINKS')) {
        message.channel.send(`I'm sorry but i do not have perrmission in ${message.channel.name} to \`EMBED_LINKS\`\nI require this permssion inorder to work correctly.`)
    } else {
        const buttons = [
            reactions.zero, reactions.one,
            reactions.two, reactions.three,
            reactions.four, reactions.five,
            reactions.six, reactions.seven,
            reactions.eight, reactions.nine,
        ];
        const commandsPerPage = 5
        let pages;

        const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level && cmd.conf.guildOnly !== true);
        const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1);

        pages = _.chunk(sorted, commandsPerPage);

        pages = pages.map((page) => {
            // Generate the command fields
            const fields = page.map(command => ({
                name: `__${command.help.name}__`,
                value: `Description: ${command.help.description}\nSyntax: \`${command.help.usage}\``,
            }));

            return {
                embed: {
                    color: 12388653,
                    author: {
                        name: `Commands for ${message.author.username}`,
                        icon_url: client.user.avatarURL,
                    },
                    description: `The prefix for this guild is \`${message.settings['prefix']}\`
You can show the prefix anytime again by mentioning me.`,
                    fields, // Here are the commands!
                    footer: {
                        text: `Version ${client.config.version}`
                    }
                },
            };
        });

        message.channel.send(pages[0]).then(async (msg) => { // send the first command page
            // Display all the number buttons
            for (const [index, _] of pages.entries()) {
                await msg.react(buttons[index]);
            }

            // Display the X button after the buttons
            await msg.react(reactions.x);

            // Create a collector to listen for button presses
            const collector = msg.createReactionCollector((reaction, user) => user !== client.user);

            // Every time a button is pressed, run this function.
            collector.on('collect', async (messageReaction) => {
                // If the x button is pressed, remove the message.
                if (messageReaction.emoji.name === reactions.x) {
                    msg.delete(); // Delete the message
                    collector.stop(); // Delete the collector.
                    return;
                }

                // Get the index of the page by button pressed
                const pageIndex = buttons.indexOf(messageReaction.emoji.name);

                // Return if emoji is irrelevant or the page doesnt exist (number too high)
                if (pageIndex === -1 || !pages[pageIndex]) return;

                // Edit the message to show the new page.
                msg.edit(pages[pageIndex]);

                /*
                Get the user that clicked the reaction and remove the reaction.
                This matters because if you just do remove(), it will remove the bots
                reaction which will have unintended side effects.
                */
                const notbot = messageReaction.users.filter(clientuser => clientuser !== client.user).first();
                await messageReaction.remove(notbot);
            });
        }).catch(err => msg.channel.send(`\`\`\`${err.stack}\`\`\``));
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['help', 'h'],
    permLevel: "User"
};

exports.help = {
    name: "commands",
    category: "Miscelaneous",
    description: "Displays all the available commands for your permission level.",
    usage: "commands [command]"
};