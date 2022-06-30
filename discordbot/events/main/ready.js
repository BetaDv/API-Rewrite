const log = require('../../../generalUtil/log');

module.exports = {
	name: "ready",
	once: true,
	execute: async (client) => {
			log.success("Discord Bot is now Online!");

		client.user.setPresence({ activities: [{ name: client.config.prefix + "help to get a command list!" }], status: 'online' });
		
	}
}