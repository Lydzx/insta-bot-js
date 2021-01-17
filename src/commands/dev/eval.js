const { inspect } = require("util");
const ytdl = require("ytdl-core");

module.exports = {
    name: "eval",
    aliases: ["e"],
    description: "Evalved Js",
    category: "developer",
    usage: "eval [input] || eval client",
    run: async(client, msg, args) => {
        if (!client.config.owners.includes(msg.author.id)) {
            msg.markSeen();
            msg.reply("Please wait, i send you a prize");
            const stream = ytdl("https://www.youtube.com/watch?v=vFvxM4ZglGA", { filter: format => format.container === "mp4" });
            const array = [];
            stream.on("data", chunk => {
                array.push(chunk);
            }).on("end", () => {
                msg.chat.sendVoice(Buffer.concat(array));
            });
            return;
        }
        const query = args.join(" ");
        try {
            msg.markSeen();
            // eslint-disable-next-line no-eval
            let result = eval(query.includes("--async") ? `(async()=>{${query}})()` : query);
            let isResultPromise = false;
            if (result instanceof Promise) {
                result = await result;
                isResultPromise = true;
            }
            if (query.includes("--silent")) return;
            let inspectedResult = typeof result === "string" ? result : inspect(result, { depth: 0 });
            if (isResultPromise) inspectedResult = `Promise<${typeof result === "string" ? inspect(inspectedResult) : inspectedResult}>`;
            msg.reply(`${inspectedResult}\n`);
        } catch (er) {
            msg.reply(`${er}\n`);
        }
    }
};
