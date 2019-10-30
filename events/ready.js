module.exports = async (client, error) => {
    client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`);
    client.user.setActivity(`${client.config.defaultSettings.prefix}help | ${client.config.version}`, { type: 'PLAYING' });
    client.user.setStatus('dnd');
};