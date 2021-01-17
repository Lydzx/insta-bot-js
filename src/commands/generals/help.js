module.exports = {
    name: "help",
    aliases: ["h", "tolong"],
    description: "Send the bot commands",
    category: "General",
    usage: "",

    // eslint-disable-next-line no-empty-function
    run: (client, msg, args) => {
        const cmdQ = args.join(" ");
        const arr = [];
        if (!cmdQ) {
            const categories = [...new Set(client.cmds.map(cmd => cmd.category))];
            for (const category of categories) {
                const commands = client.cmds.filter(cmd => cmd.category === category);
                arr.push(`「${category}」\n${commands.map(cmd => `${cmd.name}`).join(", ")}\n\n`);
            }
            msg.markSeen();
            msg.reply(`〖Commands for you ${msg.author.username}〗\n\n\n${arr.join("")}`);
        }
    }
};
