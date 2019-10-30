module.exports = (client, guild) => {
    client.channels.get("632005201682759712").send({
        "embed": {
            "description": client.user.username + " joined a new guild",
            "color": 2323415,
            "timestamp": guild.joinedTimestamp,
            "thumbnail": {
                "url": guild.iconURL
            },
            "author": {
                "name": "New Guild"
            },
            "fields": [
                {
                    "name": "Name",
                    "value": guild.name,
                    "inline": true
                },
                {
                    "name": "ID",
                    "value": guild.id,
                    "inline": true
                },
                {
                    "name": "Verification Level",
                    "value": guild.verificationLevel,
                    "inline": true
                },
                {
                    "name": "MemberCount",
                    "value": guild.memberCount,
                    "inline": true
                }
            ]
        }
    });
};