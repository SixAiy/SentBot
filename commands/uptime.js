const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, msg, args) => {

    try {
        const embedb = client.embed
            .setDescription(`I was started ${duration} ago`)
            .setTimestamp();
        msg.channel.send({ embedb });
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        msg.channel.send(`I was started ${duration} ago`);
    } catch (err) {
        client.channels.get("609805505933606952").send(`${msg.guild.name} (${msg.guild.id})\n \`\`\`${err.stack}\`\`\``);
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "uptime",
    category: "Miscelaneous",
    description: "Displays the bots uptime",
    usage: "uptime"
};