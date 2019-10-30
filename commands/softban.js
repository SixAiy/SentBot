const moment = require("moment");
exports.run = async (client, msg, args, level) => { 
    let bUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
    let bReason = args.join(" ").slice(22);
    if (!bUser) return msg.channel.send("**>>>** Invalid User.");
    if (!msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.send("**>>>** You do not have the permision to Softban users.");
    if (bUser.hasPermission("ADMINISTRATOR")) return msg.channel.send("**>>>** You cannot Softban this user.")

    let banEmbed = client.embed
        .setTitle("~ **SoftBan** ~")
        .setColor("#606060")
        .addField("**~**User**~**", bUser)
        .addField("**~**Author**~**", msg.author)
        .addField("**~**Channel**~**", msg.channel)
        .addField("**~**Time**~**", moment(msg.createdAt).format(`MMMM Do YYYY, h:mm a`))
        .addField("**~**Reason**~**", bReason);

    let banAnnounce = client.embed
        .setColor("#606060")
        .setDescription(`User ${bUser} got SoftBanned from the server!`);

    let banDm = client.embed
        .setColor("#606060")
        .setDescription(`**>>>** You got SoftBanned from ${msg.guild.name}!\n**>>>** Reason: ${bReason}\n**>>>** You can join again immediately.`);

    try {
        msg.guild.channels.get(jChannel).createInvite().then(invite =>
            bUser.send(invite.url)
        );
        bUser.send(banDm);
    } catch (err) {
		message.channel.send(`\`\`\`${err.stack}\`\`\``);
    }

    let botChannel = msg.guild.channels.find(`name`, "bot-reports");
    if (!botChannel) return msg.channel.send("**>>>** Could not locate Bot Report channel!\n**>>>>** Please create a channel called ``bot-reports``.");

    msg.delete().catch(O_o => { });
    msg.channel.send(banAnnounce).then(msg => msg.delete().catch(O_o => { }));
    msg.guild.member(bUser).ban(bReason);
    msg.guild.unban(bUser.id).catch(O_o => { });
    botChannel.send(banEmbed);
    client.logger.log(`User ${bUser} got SoftBanned by ${msg.author}.`);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Administrator"
};

exports.help = {
    name: "softban",
    category: "Moderation",
    description: "Ban then unban a user deleting there messages",
    usage: "softban @User"
};
