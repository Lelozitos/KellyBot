const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setNameLocalizations({})
		.setDescription('Gives information about something')
		.setDescriptionLocalizations({})
		.addSubcommand((subcommand) =>
			subcommand
				.setName('user')
				.setDescription('Gives information about an User')
				.addUserOption((option) =>
					option.setName('user').setDescription('User to fetch their info')
				)
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName('server')
				.setDescription('Gives information about this Server')
		),

	async run(interaction, bot, lang) {
		const { locale } = interaction;
		if (interaction.options.getSubcommand() === 'user') {
			let mention;
			if (interaction.options.data[0].options.length != 0)
				mention = interaction.options.getUser('user');
			else mention = interaction.user;

			// .setColor(mention.accentColor);     only by fetching the user

			const embed = new EmbedBuilder()
				.setTitle(`🙍‍♂️ • ${lang['User Info']}`)
				.setDescription(
					`${mention}\n\n🔮 **${lang['User Tag']}** • ${mention.tag}\n🔮 **${
						lang['User Id']
					}** • ${mention.id}\n🔮 **${
						lang['Account Created at']
					}** • ${mention.createdAt.toLocaleDateString(locale)}`
				)
				.setThumbnail(mention.displayAvatarURL({ size: 4096, dynamic: true }))
				.setFooter({
					iconURL: interaction.user.displayAvatarURL(),
					text: interaction.user.username,
				})
				.setColor(bot.color);

			await interaction.reply({ embeds: [embed] });
		} else if (interaction.options.getSubcommand() === 'server') {
			let guild = interaction.guild;
			let owner = await bot.users.fetch(guild.ownerId);

			// https://discord-api-types.dev/api/discord-api-types-v10/enum/ChannelType
			const embed = new EmbedBuilder()
				.setTitle(`👩‍💻 • ${lang['Server Info']}`)
				.setDescription(
					`${owner}\n\n🔮 **${lang['Guild Name']}** • ${guild.name}\n🔮 **${
						lang['Members']
					}** • ${guild.memberCount}\n🔮 **${
						lang['Voice / Text Channels']
					}** • ${guild.channels.cache.filter((c) => c.type == 2).size} / ${
						guild.channels.cache.filter((c) => c.type == 0).size
					}\n🔮 **${
						lang['Server Created at']
					}** • ${guild.createdAt.toLocaleDateString(locale)}`
				)
				.setThumbnail(interaction.guild.iconURL({ size: 4096, dynamic: true }))
				.setFooter({
					iconURL: interaction.user.displayAvatarURL(),
					text: interaction.user.username,
				})
				.setColor(bot.color);

			// https://www.youtube.com/watch?v=eVhCglFpQbM

			await interaction.reply({ embeds: [embed] });
		}
	},
};
