const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('count')
		.setDescription('Count the size of the string!')
		.addStringOption((option) =>
			option
				.setName('string')
				.setDescription('Message to count')
				.setRequired(true)
		),

	async run(interaction, bot) {
		interaction.reply({
			content: `${interaction.options.getString('string').length}`,
		});
	},
};
