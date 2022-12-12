const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
} = require('discord.js');

// Needs to be tested
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setNameLocalizations({})
		.setDescription('Bans an user from the server')
		.setDescriptionLocalizations({})
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false)
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('User to be banned')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option.setName('reason').setDescription('Reason for the ban')
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

		member.ban({ deleteMessageDays: 7, reason: reason });

		if (!interaction.options.getBoolean('silent'))
			return interaction.reply(
				`\`${mention.username}\` ${lang['has been banned']}`
			);

		const embed = new EmbedBuilder()
			.setTitle(`❌ ${["You've been banned"]}`)
			.setDescription(`${lang['Reason']}:\n${reason}`)
			.setThumbnail(interaction.guild.iconURL({ size: 4096, dynamic: true }))
			.setFooter({
				iconURL: interaction.user.displayAvatarURL(),
				text: interaction.user.username,
			})
			.setColor(0xff0000);

		await user
			.send({ embeds: [embed] })
			.catch(interaction.reply(lang["User's DM's are off"]));

		interaction.reply(`${mention.username} ${lang['has been banned']}`);
	},
};
