const {
	MessageEmbed
} = require("discord.js");
const color = require("../../data/colors");

module.exports = {
	name: 'eval',
	aliases: ["evaluate"],
	devOnly: true,
	guildOnly: true,
	execute(client, message, args) {
		if (!args || args === []) {
				let errorEMB = new MessageEmbed().setTitle("Error...")
					.setColor(color.error)
					.setDescription("No code to evaluate specified.")
					.setTimestamp();
				return message.channel.send({ embeds: [errorEMB] })
			}
		
		try {
			function clean(text) {
				if (typeof (text) === "string")
					return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
				else
					return text;
			}

			const code = args.join(" ");
			let evaled = eval(code);

			if (typeof evaled !== "string")
				evaled = require("util").inspect(evaled);
			let successEMB = new MessageEmbed().setTitle("Code Evaluated...")
				.setColor(color.success)
				.setDescription(clean(evaled)).setTimestamp();
			return message.channel.send({ embeds: [successEMB] })
		} catch (err) {

			let errorEMB2 = new MessageEmbed().setTitle("Error...")
				.setColor(color.error)
				.setDescription(`\`\`\`xl\n${clean(err)}\n\`\`\``)
				.setTimestamp();
			console.log(clean(err))
			return message.channel.send({ embeds: [errorEMB2] })

		}
	}
}