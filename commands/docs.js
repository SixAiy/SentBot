const fetch = require('node-fetch');
exports.run = async (client, msg, args, level) => {

    try {
        // Discord.js Docs API Request Infomation
        const projectRequirments = args[0] === 'main' || args[0] === 'rpc' || args[0] === 'commando'
        const branchRequirments = args[1] === 'master' || args[1] === 'stable';
        const queryStringRequirments = args[2]
        const requirements = projectRequirments || branchRequirments || queryStringRequirments
        // Checks for the Arguments if none, dosen't request to the API
        if (!requirements) {
            msg.channel.send({
                embed: {
                    color: 2266867,
                    author: {
                        name: 'Docs',
                        icon_url: 'https://i.imgur.com/LM8YCyk.png'
                    },
                    description: `You need to supply a query

Project: **main** | **rpc** | **commando**
Branch: **master** | **stable**

Usage: \`${msg.settings['prefix']}docs <project> <branch> help\``
                }
            })
        } else {
            // Returns the API request and shows the infomation in a nice Embed!
            const project = args[0];
            const branch = args[1];
            const queryString = args[2];
            fetch(`https://djsdocs.sorta.moe/${project}/${branch}/embed?q=${queryString}`)
                .then(response =>
                    response.json()
                )
                .then(data => {
                    msg.channel.send({ embed: data });
                });
        };
    } catch (err) {
        client.channels.get("609805505933606952").send(`${msg.guild.name} (${msg.guild.id})\n \`\`\`${err.stack}\`\`\``);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['djs','doc', 'docsjs'],
    permLevel: "Bot Admin"
};

exports.help = {
    name: "docs",
    category: "Admin",
    description: "Displays all the available commands for your permission level.",
    usage: "docs [infomation]"
};