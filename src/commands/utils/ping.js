const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('My latency'),

	async run(interaction, bot) {
		const message = await interaction.deferReply({
			fetchReply: true,
		});

		const newMessage = `🏓 API: ${bot.ws.ping}\n🏓 Bot: ${
			message.createdTimestamp - interaction.createdTimestamp
		}`;
		await interaction.editReply({
			content: newMessage,
		});
	},
};
