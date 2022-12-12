const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setNameLocalizations({})
		.setDescription('Send a custom message')
		.setDescriptionLocalizations({})
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)

		.addStringOption((option) =>
			option
				.setName('string')
				.setDescription('Message to send')
				.setRequired(true)
		),

	async run(interaction, bot, lang) {
		interaction.reply({ content: '.' });
		await interaction.deleteReply();
		interaction.channel.send(interaction.options.getString('string'));
	},
};
