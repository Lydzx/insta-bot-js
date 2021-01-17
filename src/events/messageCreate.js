
/**
 * @param {import("../structures/Client")} client
 */
module.exports = (client, message) => {
    const prefix = client.config.prefix;
    if (!message.content) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim()
        .split(/ +/gu);
    const cmd = args.shift().toLowerCase();
    if (!cmd.length) return;

    let cmds = client.cmds.get(cmd);
    if (!cmds) cmds = client.cmds.get(client.aliases.get(cmd));
    if (cmds) cmds.run(client, message, args);
    console.log(`${message.author.username} used ${prefix} ${cmds.length ? cmds.name : cmd}`);
};
