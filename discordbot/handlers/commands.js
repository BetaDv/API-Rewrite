const fs = require("fs");
const { join } = require("path")

module.exports = (client) => {
	const commandFolders = fs.readdirSync(join(__dirname, '..', 'commands'));

	for (const folder of commandFolders) {
		const commandFiles = fs.readdirSync(join(__dirname, '..', 'commands', folder)).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`../commands/${folder}/${file}`);
			client.commands.set(command.name, command);
		}
	}
}