module.exports = (client, member) => {
        // Load the guild's settings
        const settings = client.getSettings(member.guild.id);

        if (settings.icuEnabled == "true") {
            const usr = client.users.get(member.user.id);
            if (usr.createdTimestamp < 1800) {
                try {
                    client.channels.get(settings.icuChannel).send(`User (U:<@${usr.id}> (${usr.id}))\nAccount younger then 30 mins`)
                } catch (err) {
                    client.channels.get("609805505933606952").send(`\`\`\`${err.stack}\`\`\``);
                }
            };
        }
        if (settings.welcomeEnabled != "true") return;
        const welcomeMessage = settings.welcomeMessage.replace("{{user}}", '<@' + member.user.id + '>');
        member.guild.channels.find(c => c.id == settings.welcomeChannel).send(welcomeMessage)
            .catch(err => client.channels.get("609805505933606952").send(`\`\`\`${err.stack}\`\`\``));
};