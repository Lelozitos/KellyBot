const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setNameLocalizations({
			de: 'sprechen',
			'es-ES': 'falar',
			'pt-BR': 'falar',
		})
		.setDescription('Send a custom message')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)

		.addStringOption((option) =>
			option
				.setName('string')
				.setDescription('Message to send')
				.setRequired(true)
		),

	async run(interaction, bot) {
		interaction.reply({ content: '.' });
		await interaction.deleteReply();
		interaction.channel.send(interaction.options.getString('string'));
	},
};
