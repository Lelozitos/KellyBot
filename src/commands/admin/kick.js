const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks an user from the server')
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
		.setDMPermission(false)
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('User to be kicked')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option.setName('reason').setDescription('Reason for the kick')
		)
		.addBooleanOption((option) =>
			option
				.setName('silent')
				.setDescription('Do not send the user a notification about this')
		),

	async run(interaction, bot) {
		const mention = interaction.options.getUser('user');
		const member = await interaction.guild.members.fetch(mention.id);

		const reason =
			interaction.options.getString('reason') || 'No reason provided';

		member.kick(reason);

		if (!interaction.options.getBoolean('silent'))
			return interaction.reply(`User ${mention.username} has been kicked!`);

		const embed = new EmbedBuilder()
			.setTitle(`❌ You've been kicked`)
			.setDescription(`Reason:\n${reason}`)
			.setThumbnail(interaction.guild.iconURL({ size: 4096, dynamic: true }))
			.setFooter({
				iconURL: interaction.user.displayAvatarURL(),
				text: interaction.user.username,
			})
			.setColor(0xff0000);

		await user
			.send({ embeds: [embed] })
			.catch(interaction.reply(`User's DM's are off`));

		interaction.reply(`User ${mention.username} has been kicked!`);
	},
};
