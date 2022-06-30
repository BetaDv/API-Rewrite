const log = require('../../../generalUtil/log');
const { prefix, developers } = require("../../data/config")
const { MessageEmbed } = require('discord.js');

const color = require("../../data/colors")

const embed = {
	noDMS: new MessageEmbed()
	.setColor(color.error)
	.setTitle('Error...')
	.setDescription('You cannot use this command inside of private messages, please switch to the official Discord Server.')
	.setTimestamp(),

  errorRunningCMD: new MessageEmbed()
	.setColor(color.error)
	.setTitle('Error...')
	.setDescription('Something went wrong whilst executing this command, please contact a Developer via private messages to get assisted instead.')
	.setTimestamp(),

	noPerms: new MessageEmbed()
	.setColor(color.error)
	.setTitle('Error...')
	.setDescription('You do not have enough permissions to execute this command.')
	.setTimestamp(),

	notDev: new MessageEmbed()
	.setColor(color.error)
	.setTitle('Error...')
	.setDescription('Only the bot developers may use this command, please refrain from trying.')
	.setTimestamp(),
}

module.exports = {
	name: "messageCreate",
	once: false,
	execute: async (message, client) => {
			if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') return message.channel.send({ embeds: [embed.noDMS] });

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) return message.channel.send({ embeds: [embed.noPerms] });
		
	}

		if(command.devOnly === true && !developers.includes(message.author.id)) return message.channel.send({ embeds: [embed.notDev] });

	try {
		command.execute(client, message, args);
	} catch (error) {
	  console.error(error);
		return message.channel.send({ embeds: [embed.errorRunningCMD] });
	}
	}
}