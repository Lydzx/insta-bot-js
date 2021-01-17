module.exports = {
    name: "ping",
    aliases: ["pong"],
    description: "Mengecek ping bot",
    category: "General",
    usage: "",

    run: (client, msg, args) => {
        msg.markSeen();
        msg.reply("pong");
    }
};
