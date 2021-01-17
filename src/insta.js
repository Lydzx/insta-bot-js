require("dotenv").config();
const Insta = require("./structures/Client");
const client = new Insta();
const fs = require("util").promisify(require("fs").readdir);

async function eventInit() {
    const Event = await fs("./src/events");
    for (const file of Event) {
        const eventName = file.split(".");
        const event = require(`./events/${file}`);
        console.log(`[INFO] Event ${eventName[0]} Loaded`);
        client.on(eventName[0], event.bind(null, client));
    }
}
eventInit();
client.load();
