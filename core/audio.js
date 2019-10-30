const ytdl = require('ytdl-core');
const Discord = require('discord.js');

// OLD Requrements keep it just incase!
//const { URLSearchParams } = require("url");
//const fetch = require("node-fetch");

module.exports = async (client) => {

   client.getQueue = (server) => {
       return client.queue.get(server);
    }
    

    client.executeSong = async (requestedSong, message, serverQueue) => {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) return message.channel.send('I need the permissions to join and speak in your voice channel!');

        const songInfo = await ytdl.getInfo(requestedSong);
        const song = {
            title: songInfo.title,
            url: songInfo.video_url,
            description: songInfo.description,
            seconds: songInfo.length_seconds,
            ytname: songInfo.author.name,
            ytavatar: songInfo.author.avatar,
            yturl: songInfo.author.channel_url,
            requester: message.author,
        };

        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connections: null,
                songs: [],
                volume: 5,
                playing: true,
            };

            client.queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(song);

            try {
                const connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(message.guild, queueConstruct.songs[0]);
                const em = new Discord.RichEmbed()
                    .setAuthor(song.ytname, song.ytavatar, song.yturl)
                    .setDescription(`Now Playing: [${song.title}](${song.url})\nTime: ${song.seconds}`)
                    .setTimestamp()
                    .setFooter(`Requested by ${song.requester.tag}`, song.requester.avatarURL);
                return message.channel.send(em);
            } catch (err) {
                console.log(err);
                client.queue.delete(message.guild.id);
                return message.channel.send(`Opps i seem to be having issues, please join the support server and state the error below this message <https://discord.gg/UmDfVtC>
\`\`\`${err.stack}\`\`\`
`)
            }
        } else {
            serverQueue.songs.push(song);
            return message.channel.send(`${song.title} added by ${song.requester.tag} has been added to the queue!`);
        }

    }

    client.skipSong = (message, serverQueue) => {
        if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music');
        if (!serverQueue) return message.channel.send('There is no song that i can skip!');
        serverQueue.connection.dispatcher.end();
    }

    client.stopSong = (message, serverQueue) => {
        if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }

    client.playSong = (guild, song) => {
        const serverQueue = queue.get(guild.id);

        if (!song) {
            serverQueue.voiceChannel.leave();
            client.queue.delete(guild.id);
            return;
        }

        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
            .on('end', () => {
                console.log('Music ended!');
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            })
            .on('error', error => {
                console.error(error);
            });
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    }

    client.getYTLive = (millisec) => {
        // Credit: https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
        var seconds = (millisec / 1000).toFixed(0);
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        var live = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }
        if (minutes > 1440) {
            live = 'live';
        }
        // Normally I'd give notes here, but I actually don't understand how this code works.
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        if (hours != "") {
            return hours + ":" + minutes + ":" + seconds;
        }
        if (hours == "23") {
            return live;
        }
        return minutes + ":" + seconds;
    }



    // OLD CODE Maybe we should keep it just incase we decied to switch back to lavalink

//    client.execQueue = (player, exqueue, channel, voiceChannel) => {
//        let lavahost;
//        if ("us-south us-west us-cental us-east brazil".split(" ").includes(voiceChannel.guild.region)) {
//            lavahost = client.player.nodes[0].host;
//        } else if ("sydney singapore hong-kong japan india".split(" ").includes(voiceChannel.guild.region)) {
//            lavahost = client.player.nodes[1].host;
//        } else if ("eu-central eu-west amsterdam london russia frankfurt".split(" ").includes(voiceChannel.guild.region)) {
//            lavahost = client.player.nodes[1].host;
//        }
//        if (exqueue.length === 0) { voiceChannel.leave() };
//        if (exqueue.length > 0) {
//            let qobj = exqueue[0];
//            const innerplayer = client.player.join({ guild: channel.guild.id, channel: voiceChannel.id, host: lavahost }, { selfdeaf: false });
//            innerplayer.play(qobj.track);
//            console.log(qobj.track)
//            innerplayer.volume(15);
//            innerplayer.once("end", async data => {
//                if (exqueue.length > 0) {
//                    exqueue.shift();
//                    client.execQueue(player, exqueue, channel, voiceChannel);
//                }
//            });
//        }
//    }


//    client.getSong = (string, voiceChannel) => {
//        let lavahost;
//        if ("us-south us-west us-cental us-east brazil".split(" ").includes(voiceChannel.guild.region)) {
//            lavahost = client.player.nodes[0];
//        } else if ("sydney singapore hong-kong japan india".split(" ").includes(voiceChannel.guild.region)) {
//            lavahost = client.player.nodes[1];
//        } else if ("eu-central eu-west amsterdam london russia frankfurt".split(" ").includes(voiceChannel.guild.region)) {
//            lavahost = client.player.nodes[1];
//        }
//
//        const params = new URLSearchParams();
//        params.append("identifier", string);
//
//        return fetch(`http://${lavahost.host}:${lavahost.port}/loadtracks?${params.toString()}`, { headers: { Authorization: lavahost.password } })
//            .then(res => res.json())
//            .then(data => data.tracks)
//            .catch(err => {
//                console.error(err);
//                return null;
//            });
//    }


}
