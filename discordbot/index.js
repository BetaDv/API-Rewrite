const { Client, Intents, Collection } = require("discord.js");
const config = require("./data/config");

module.exports = (database) => {
	const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

	client.config = config;
	client.commands = new Collection();
	client.db = database;
	
	// HANDLERS
	require("./handlers/commands")(client);
	require("./handlers/events")(client);

	client.login(config.token);
}