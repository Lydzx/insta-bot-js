const req = require("node-superfetch");

module.exports = class Util {

    static async getNekos(type) {
        if (!type) type = "neko";
        const getUrl = [`https://nekos.life/api/v2/img/${type}`, `https://nekobot.xyz/api/image?type=${type}`];
        const dom = getUrl[Math.floor(Math.random() * getUrl.length)];
        const { body } = await req.get(dom);
        return body.url || body.message;
    }

    static async typing(msg, ctx) {
        msg.chat.startTyping();
        await msg.chat.sendPhoto(ctx);
        msg.chat.stopTyping();
    }

};
