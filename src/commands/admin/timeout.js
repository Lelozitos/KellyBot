const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setNameLocalizations({})
		.setDescription('Timeouts a user for a period of time')
		.setDescriptionLocalizations({})
		.setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
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
			option.setName('reason').setDescription('Reason for the timeout')
		),

	async run(interaction, bot, lang) {
		const mention = interaction.options.getUser('user');
		const member = await interaction.guild.members.fetch(mention.id);

		const time = interaction.options.getInteger('time') || 30;
		const reason =
			interaction.options.getString('reason') || lang['No reason provided'];

		// Missing Permissions
		member.timeout(time * 1000 * 60, reason);

		if (!interaction.options.getBoolean('silent'))
			interaction.reply(
				`${mention.username} ${lang['has been timed out for']} ${time} ${lang['minutes']}!`
			);
	},
};
