module.exports = async (client, error) => {
    client.channels.get("609805505933606952").send(`\`\`\`${error.stack}\`\`\``);
};