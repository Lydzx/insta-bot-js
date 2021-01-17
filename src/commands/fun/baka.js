const ytdl = require("ytdl-core");

module.exports = {
    name: "baka",
    aliases: [""],
    description: "Send anime bakaa picture",
    category: "Fun",
    usage: "",

    run: async(client, msg, args) => {
        msg.markSeen();
        try {
            const nekos = await client.fetch.get("https://nekos.life/api/v2/img/baka");
            if (!nekos) return msg.reply("Ah, sorry something is wrong");
            const wait = args[0] === "voice"
                ? await msg.reply("wait,, recording audio")
                : await msg.reply("wait, uploading your image");
            if (args[0] === "voice") {
                const links = ["y-gK-gwIQA4", "vFvxM4ZglGA", "pgoznkwpySc"];
                const dom = links[Math.floor(Math.random() * links.length)];
                const stream = ytdl(`https://www.youtube.com/watch?v=${dom}`, { filter: format => format.container === "mp4" });
                const array = [];
                stream.on("data", chunk => {
                    array.push(chunk);
                }).on("end", () => {
                    msg.chat.sendVoice(Buffer.concat(array));
                    msg.chat.deleteMessage(wait.id);
                });
                return;
            }
            await msg.reply(nekos.body.url);
            msg.chat.deleteMessage(wait.id);
        } catch (er) {
            msg.reply(`Upsss, ${er}`);
            msg.chat.stopTyping();
        }
    }
};
