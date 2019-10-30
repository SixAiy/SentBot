const
    Discord = require('discord.js'),
    { promisify } = require("util"),
    readdir = promisify(require("fs").readdir),
    Enmap = require("enmap"),
    client = new Discord.Client();

client.config = require('./core/config.js');
client.logger = require("./core/Logger.js");
require("./core/functions.js")(client);

client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({ name: "settings" });

const init = async () => {

    const cmdModuleFiles = await readdir("./modules/");
    client.logger.log(`Loading a total of ${cmdModuleFiles.length}`);
    cmdModuleFiles.forEach(f => {
        if (!f.endsWith(".js")) return;
        const response = client.loadModuleCommand(f);
        if (response) client.log.logger(response);
    })

    const cmdFiles = await readdir("./commands/");
    client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach(f => {
        if (!f.endsWith(".js")) return;
        const response = client.loadCommand(f);
        if (response) client.logger.log(response);
    });
    const evtFiles = await readdir("./events/");
    client.logger.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        client.logger.log(`Loading Event: ${eventName}`);
        const event = require(`./events/${file}`);
        client.on(eventName, event.bind(null, client));
    });

    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }
    
    client.shard.fetchClientValues('guilds.size')
        .then(results => {
            console.log(`${results.reduce((prev, guildCount) => prev + guildCount, 0)} total guilds`);
        })
        .catch(console.error);

    client.getShard = () => {
        let shardin = Math.floor(client.guilds.size / 2500);
        if (!shardin || shardin == null || shardin == 0)
            shardin = 1;

        return shardin;
    }
    client.login(client.config.token);
};

init();
