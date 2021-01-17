module.exports = {
    name: "ping",
    aliases: ["pong"],
    description: "Im alive",
    category: "General",
    usage: "",

    run: (client, msg, args) => {
        msg.markSeen();
        msg.reply("pong");
    }
};
