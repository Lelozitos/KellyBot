const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('count')
		.setNameLocalizations({})
		.setDescription('Count the size of the string')
		.setDescriptionLocalizations({})
		.addStringOption((option) =>
			option
				.setName('string')
				.setDescription('Message to count')
				.setRequired(true)
		),

	async run(interaction, bot, lang) {
		interaction.reply({
			content: `${interaction.options.getString('string').length}`,
		});
	},
};
