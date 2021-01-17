module.exports = {
    name: "neko",
    aliases: ["kucing"],
    description: "Send anime neko picture",
    category: "Fun",
    usage: "",

    run: async(client, msg, args) => {
        msg.markSeen();
        try {
            const neko = await client.util.getNekos("neko");
            if (!neko) return msg.reply("Ah, sorry something is wrong");
            const wait = await msg.reply("wait,, uploading your image");
            msg.chat.startTyping();
            await msg.chat.sendPhoto(neko);
            msg.chat.stopTyping(); msg.chat.deleteMessage(wait.id);
        } catch (er) {
            msg.reply(`Upsss, ${er}`);
            msg.chat.stopTyping();
        }
    }
};
