const insta = require("@androz2091/insta.js");
const Collection = require("@discordjs/collection");
const config = require("../config.json");

module.exports = class InstaClient extends insta.Client {

    constructor(opt) {
        super({ disableReplyPrefix: true }, opt);
        require("./CommandHandler")(this);
        this.cmds = new Collection();
        this.aliases = new Collection();
        this.config = config;
        this.fetch = require("node-superfetch");
        this.util = require("./Util");
    }

    load() {
        this.on("connected", () => {
            console.log(`Logged in as ${this.user.username}`);
        });
        this.login(process.env.email, process.env.pw);
    }

};
