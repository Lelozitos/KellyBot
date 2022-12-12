const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
} = require('discord.js');

// Needs to be tested
module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setNameLocalizations({})
		.setDescription('Kicks an user from the server')
		.setDescriptionLocalizations({})
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

	async run(interaction, bot, lang) {
		const mention = interaction.options.getUser('user');
		const member = await interaction.guild.members.fetch(mention.id);

		const reason =
			interaction.options.getString('reason') || lang['No reason provided'];

		member.kick(reason);

		if (!interaction.options.getBoolean('silent'))
			return interaction.reply(
				`${mention.username} ${lang['has been kicked']}`
			);

		const embed = new EmbedBuilder()
			.setTitle(`❌ ${lang["You've been kicked"]}`)
			.setDescription(`Reason:\n${reason}`)
			.setThumbnail(interaction.guild.iconURL({ size: 4096, dynamic: true }))
			.setFooter({
				iconURL: interaction.user.displayAvatarURL(),
				text: interaction.user.username,
			})
			.setColor(0xff0000);

		await user
			.send({ embeds: [embed] })
			.catch(interaction.reply(lang["User's DM's are off"]));

		interaction.reply(`${mention.username} ${lang['has been kicked']}`);
	},
};
