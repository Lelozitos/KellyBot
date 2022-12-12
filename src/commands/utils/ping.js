const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setNameLocalizations({})
		.setDescription('My latency')
		.setDescriptionLocalizations({}),

	async run(interaction, bot, lang) {
		const message = await interaction.deferReply({
			fetchReply: true,
		});

		const newMessage = `🏓 Bot: ${
			message.createdTimestamp - interaction.createdTimestamp
		}ms\n🏓 API: ${bot.ws.ping}ms`;
		await interaction.editReply({
			content: newMessage,
		});
	},
};
