const fs = require("fs");
const categories = fs.readdirSync("./src/commands/");

module.exports = bot => {
    try {
        categories.forEach(category => {
            fs.readdir(`./src/commands/${category}/`, err => {
                if (err) return console.error(err);
                const init = () => {
                    const Commands = fs.readdirSync(`./src/commands/${category}`)
                        .filter(file => file.endsWith(".js"));
                    for (const file of Commands) {
                        const cmd = require(`../commands/${category}/${file}`);
                        bot.cmds.set(cmd.name, cmd);
                        if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach(aliases => bot.aliases.set(aliases, cmd.name));
                    }
                };
                init();
            });
        });
    } catch (error) {
        console.log(error);
    }
};
