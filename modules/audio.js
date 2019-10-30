const YouTube = require('simple-youtube-api');
const { ytkey } = require("../core/config");
const yt = new YouTube(ytkey);
const ytdl = require('ytdl-core');
const Discord = require('discord.js');

exports.run = async (client, msg, args, level) => { // eslint-disable-line no-unused-vars


    const serverQueue = queue.get(message.guild.id);
    client.cmds.set('play');

    if (client.cmds.get('play')) {

    }



    // Functions for the Audio player!

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: "User"
};

exports.help = {
    name: "audio",
    category: "Audio",
    description: "This is the main music Core!",
    usage: "play <url/name> , stop , skip"
};