const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Timeouts a user for a period of time')
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
		.setDMPermission(false)
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('User to be timed out')
				.setRequired(true)
		)
		.addIntegerOption((option) =>
			option
				.setName('time')
				.setDescription('Time in minutes the user remains timed out')
		)
		.addStringOption((option) =>
			option.setName('reason').setDescription('Reason for the time out')
		),

	async run(interaction, bot) {
		const mention = interaction.options.getUser('user');
		const member = await interaction.guild.members.fetch(mention.id);

		const time = interaction.options.getInteger('time') || 30;
		const reason =
			interaction.options.getString('reason') || 'No reason provided';

		member.timeout(time * 1000 * 60, reason);

		if (!interaction.options.getBoolean('silent'))
			return interaction.reply(`User ${mention.username} has been kicked!`);

		interaction.reply(
			`User ${mention.username} has been timed out for ${time} mintues!`
		);
	},
};
