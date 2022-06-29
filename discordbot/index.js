const { Client, Intents } = require("discord.js");
const config = require("./data/config");

const allIntents = new Intents.FLAGS.allIntents();

const client = new Client({ allIntents });

client.once("ready", () => {
  console.log("Ready!");
});

client.login(config.token);
