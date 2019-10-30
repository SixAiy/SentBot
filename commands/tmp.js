const fetch = require('node-fetch');
const { RichEmbed } = require('discord.js');
exports.run = async (client, msg, args) => {	

    try {
        // stats.truckersmp.com/api
        const url = 'https://api.truckersmp.com/v2'
        const imgurl = 'https://truckersmp.com/assets/img/avatar.png'
        if (!args[0]) {
            const embed = new RichEmbed();
            embed.setAuthor(`TMP Commands`);
            embed.addField(`\`..tmp servers\``, `Shows Servers`, true);
            embed.addField(`\`..tmp time\``, `Shows gametime`, true);
            embed.addField(`\`..tmp player tmpID\``, `Shows Player info`, true);
            embed.addField(`\`..tmp version\``, `Current Game Version`, true);
            embed.setThumbnail(imgurl);
            embed.setTimestamp();
            msg.channel.send({ embed })
            msg.channel.send(`you must supply me with\n\n **plookup\n servers\n bans\n gtime\n rules\n version**\n\nUsage ${msg.settings['prefix']}tmp plookup 1234221234`)
        } else if (args[0] == 'servers') {
            fetch(`${url}/servers`)
                .then(res => res.json())
                .then(async data => {
                    const embed = new RichEmbed();
                    data.response.map(x => {
                        if (x.online === true) {
                            embed.addField(x.name, `Game: ${x.game}\nOnline: ✅\nQueue: ${x.queue}\nPlayers: ${x.players}\n\n`, true);
                        } else {
                            embed.addField(x.name, `Game: ${x.game}\nOnline: ❌\nQueue: ${x.queue}\nPlayers: ${x.players}\n\n`, true);
                        }
                    });
                    embed.setAuthor('TruckersMP Servers')
                    embed.setThumbnail(imgurl);
                    embed.setTimestamp()
                    msg.channel.send({ embed });
                })
        } else if (args[0] == 'time') {
            fetch(`${url}/game_time`)
                .then(res => res.json())
                .then(data => {
                    const embed = new RichEmbed()
                        .setAuthor('TruckersMP Game Time')
                        .setDescription(client.getYTLive(data.game_time))
                        .setThumbnail(imgurl)
                        .setTimestamp()
                    msg.channel.send({ embed });
                });
        } else if (args[0] == 'player') {
            fetch(`${url}/player/${args[1]}`)
                .then(res => res.json())
                .then(data => {
                    const embed = new RichEmbed();
                    embed.setAuthor(`${data.response.name} (${data.response.id})`);
                    embed.addField(`Join Date`, `${data.response.joinDate}`, true);
                    embed.addField(`SteamID64`, `${data.response.steamID64}`, true);
                    embed.addField(`SteamID`, `${data.response.steamID}`, true);
                    embed.addField(`Account Type`, `${data.response.groupName}`, true);

                    if (data.response.banned == true) {
                        embed.addField(`Banned Until`, `${data.response.bannedUntil}`, true);
                    } else {
                        embed.addField(`Banned`, `No`, true);
                    }
                    if (data.response.permissions.isGameAdmin == true) {
                        embed.addField(`Game Admin`, `Yes`, true);
                    } else {
                        embed.addField(`Game Admin`, `No`, true);
                    }

                    if (data.response.vtc.inVTC == true) {
                        embed.addField(`VTC ID`, `${data.response.vtc.id}`, true);
                        embed.addField(`VTC Name`, `${data.response.vtc.name}`, true);
                        embed.addField(`VTC Tag`, `${data.response.vtc.tag}`, true);
                        embed.addField(`VTC Member ID`, `${data.response.vtc.memberID}`, true);
                    } else {
                        embed.addField(`VTC Status`, `Player is currently not in a VTC`);
                    }

                    embed.setThumbnail(`${data.response.avatar}`);
                    embed.setTimestamp();
                    msg.channel.send({ embed });

                });
        } else if (args[0] == 'version') {
            fetch(`${url}/version`)
                .then(res => res.json())
                .then(data => {
                    const embed = new RichEmbed();
                    embed.setThumbnail(imgurl);
                    embed.setAuthor(`TMP Version: ${data.stage} ${data.numeric}`);
                    embed.addField(`ETS2 Version`, `${data.supported_game_version}`);
                    embed.addField(`ATS Version`, `${data.supported_ats_game_version}`);
                    msg.channel.send({ embed });
                });
        } else if (args[0] == 'vtc') {
            fetch(`${url}/vtc/${args[1]}`)
                .then(res => res.json())
                .then(data => {
                    const embed = new RichEmbed();
                    const dt = data.response;
                    embed.setThumbnail(data.response.logo);
                    embed.setAuthor(`${dt.name} (${dt.id})`);
                    embed.setDescription(`**${dt.slogan}**\n\n**Information**\n${dt.information}\n\n**Rules**\n${dt.rules}\n\n **Requirements**\n${dt.requirements}`);
                    if (dt.website) embed.addField(`Website`, `${dt.website}`, false);
                    if (dt.games.ats == true && dt.games.ets == true) {
                        embed.addField(`ATS`, `Yes`, true);
                        embed.addField(`ETS2`, `Yes`, true);
                    } else if (dt.games.ats == true && dt.games.ets == false) {
                        embed.addField(`ATS`, `Yes`, true);
                        embed.addField(`ETS2`, `No`, true);
                    } else if (dt.games.ets == true && dt.games.ats == false) {
                        embed.addField(`ATS`, `No`, true);
                        embed.addField(`ETS2`, `Yes`, true);
                    }
                    embed.addField(`Recruitment Status`, `${dt.recruitment}`, true);
                    embed.addField(`Language`, `${dt.language}`, true);
                    if (dt.verified == true) embed.addField(`Verified`, `Yes`, true);
                    embed.addField(`Created`, `${dt.created}`, true);
                    embed.setTimestamp();
                    embed.setFooter(`${dt.owner_username} (${dt.owner_id})`);
                    msg.channel.send({ embed });
                });
        } else if (args[0] == 'vtcnews') {
            fetch(`${url}/vtc/${args[1]}`)
                .then(res => res.json())
                .then(xdata => {
                    fetch(`${url}/vtc/${args[1]}/news`)
                        .then(res => res.json())
                        .then(data => {
                            const dt = data.response.news[0];
                            const embed = new RichEmbed();
                            embed.setThumbnail(xdata.response.logo);
                            embed.setAuthor(`${xdata.response.name} (${xdata.response.id})`);
                            embed.setDescription(`**${dt.title}**\n\n${dt.content_summary}`);
                            embed.setTimestamp()
                            embed.setFooter(`Author: ${dt.author} (${dt.author_id})`)
                            msg.channel.send({ embed });
                        });
                });
        }
    } catch (err) {
        client.channels.get("609805505933606952").send(`${msg.guild.name} (${msg.guild.id})\n \`\`\`${err.stack}\`\`\``);
    }
	
};	

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['tmp'],
    permLevel: "User"
};

exports.help = {
    name: "truckersmp",
    category: "TruckersMP",
    description: "Request infomation from TruckersMP.com",
    usage: "tmp <server|plookup|bans|gtime|rules|version>"
};