const { Client, Intents, Collection } = require("discord.js");
const config = require("./data/config");

const log = require("../generalUtil/log");

module.exports = (database) => {
	const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

	client.once("ready", () => {
		log.success("Discord Bot is Online!");
	});

	client.commands = new Collection();

	// HANDLERS
	require("./handlers/commands")(client);
	require("./handlers/events")(client);

	client.login(config.token);
}