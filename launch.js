const config = require('./core/config')
const { ShardingManager } = require('discord.js');

const sharding = new ShardingManager('./main.js', {
    token: config.token,
    autoSpawn: true,
    autoReconnect: true
});

sharding.spawn();
sharding.on('launch', shard => console.log(`Launched shard ${shard.id}`));