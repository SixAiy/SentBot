const { RichEmbed } = require("discord.js");


exports.run = async (client, msg, args) => {



    const options = {
        roles: ["MILSIM (ARMA 3)", "BNTrucks.com", "Minecraft", "Racer", "Gmod"],
        reactions: ["a3", "bntucks", "bladecraft", "ir", "gmod"]
    };
    
    // Function to generate the embed fields, based on your settings and if you set "const embed = true;"
    function generateEmbedFields() {
        return options.roles.map((r, e) => {
            return {
                emoji: options.reactions[e],
                role: r
            };
        });
    }

    const missing = msg.channel.permissionsFor(message.guild.me).missing('MANAGE_MESSAGES');

    if (missing.includes('MANAGE_MESSAGES')) {
        msg.channel.send("I need permission to delete your command message! Please assign the 'Manage Messages' permission to me in this channel!");
        msg.delete().catch(O_o => { });
    } else if (missing.includes('ADD_REACTIONS')) {
        msg.channel.send("I need permission to delete your command message! Please assign the 'Manage Messages' permission to me in this channel!");
        msg.delete().catch(O_o => { });
    }
    const roleEmbed = new RichEmbed()
        .setDescription(`
- Please state the division you wish to join.

Trucking - Go to https://bntucks.com/ first to apply.
MILSIM (ARMA 3)
FiveM (GTA V RP)
Motorsports - (https://iracing.com/)
Garry's Mod 
Farming Simulator 2019
 
Space Engineers - (Coming Soon)
`)
        .setColor('#00b903')
        .setThumbnail(msg.guild.iconURL);

    const fields = generateEmbedFields();
    for (const { emoji, role } of fields) {
        if (msg.guild.roles.find(r => r.name == role))
            msg.channel.send(`The role ${role} does not exist!`);

        const customEmote = client.emojis.find(e => e.name === options.reactions);
        roleEmbed.addField(customEmote, role, true);
    }

    msg.channel.send(roleEmbed).then(async m => {
        for (const r of options.reactions) {
            const emoji = r;
            const customCheck = client.emojis.find(e => e.name == emoji);
            m.react(customCheck.id);
        }
    })



    await msg.delete().catch(O_o => { });

    const milsim = msg.guild.roles.get("602236634599129089");
    const btn = msg.guild.roles.get("602233792974946324");
    const mc = msg.guild.roles.get("635879838753882152");
    const iracing = msg.guild.roles.get("602237175056302090");
    const gmod = msg.guild.roles.get("602240938475126817");

    const filter = (reaction, user) => [
        '<:a3:635881744247029852>',
        '<:bntucks:635892967898480670>',
        '<:bladecraft:635892967869251604>',
        '<:ir:635881743135801389>',
        '<:gmod:635892967995080724>'
    ].includes(reaction.emoji.name) && user.id == msg.author.id;

    const embed = new RichEmbed()
        .setAuthor("Available Roles")
        .setDescription(`Please choose the Divison that you would like to be apart of.`)
        .addField('<:a3:635881744247029852> Arma 3', `${milsim.toString()}`, false)
        .addField('<:bntucks:635892967898480670> TruckersMP', `${btn.toString()}`, false)
        .addField('<:bladecraft:635892967869251604> Minecraft', `${mc.toString()}`, false)
        .addField('<:ir:635881743135801389> iRacing.com', `${iracing.toString()}`, false)
        .addField('<:gmod:635892967995080724> Garry\'s Mod', `${gmod.toString()}`, false)
        .setColor(0x00b903)
        .setFooter(`ID: ${msg.author.id}`);
    msg.channel.send(embed)
        .then(async (msgg) => {

            await msgg.react('<:a3:635881744247029852');
            await msgg.react('<:bntucks:635892967898480670');
            await msgg.react('<:bladecraft:635892967869251604');
            await msgg.react('<:ir:635881743135801389');
            await msgg.react('<:gmod:635892967995080724');


            const collector = msgg.createReactionCollector((buttons, user) => user !== client.user && console.log(user));

            collector.on('collect', async (messageReaction) => {

                const notbot = messageReaction.users.filter(clientuser => clientuser !== client.user).first();
                messageReaction.remove(notbot);

                if (messageReaction.emoji.id == '635881744247029852') {
                    msg.member.addRole(milsim)
                    msg.channel.send(`You have been added to ${milsim.name}`).then(m => m.delete(3000)).catch(err => console.log(err))
                } else if (messageReaction.emoji.id == '635892967898480670') {
                    msg.member.addRole(btn);
                    msg.channel.send(`You have been added to ${milsim.name}`).then(m => m.delete(3000)).catch(err => console.log(err))
                } else if (messageReaction.emoji.id == '635892967869251604') {
                    msgg.member.addRole(mc);
                    msg.channel.send(`You have been added to ${milsim.name}`).then(m => m.delete(3000)).catch(err => console.log(err))
                } else if (messageReaction.emoji.id == '635881743135801389') {
                    msgg.member.addRole(iracing);
                    msg.channel.send(`You have been added to ${milsim.name}`).then(m => m.delete(3000)).catch(err => console.log(err))
                } else if (messageReaction.emoji.id == '635892967995080724') {
                    msgg.member.addRole(gmod);
                    msg.channel.send(`You have been added to ${milsim.name}`).then(m => m.delete(3000)).catch(err => console.log(err))
                }
            })
        }).catch(collected => {
            return console.log(collected.message)
        });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Owner"
};

exports.help = {
    name: "reactcmd",
    category: "BladeNode Gaming - https://bladenode.org",
    description: "BladeNode Gaming - https://bladenode.org",
    usage: "reactcmd"
};