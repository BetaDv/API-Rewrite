const fs = require("fs");
const { join } = require("path");

module.exports = (client) => {
	const eventFolders = fs.readdirSync(join(__dirname, '..', 'events'));

	for (const folder of eventFolders) {
		const eventFiles = fs.readdirSync(join(__dirname, '..', 'events', folder)).filter(file => file.endsWith('.js'));
		for (const file of eventFiles) {
			const event = require(`../events/${folder}/${file}`);
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			} else {
				client.on(event.name, (...args) => event.execute(...args));
			}
		}
	}
}