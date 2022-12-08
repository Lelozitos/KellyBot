const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Gives information about something')
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

	async run(interaction, bot) {
		if (interaction.options.getSubcommand() === 'user') {
			let mention;
			if (interaction.options.data[0].options.length != 0)
				mention = interaction.options.getUser('user');
			else mention = interaction.user;

			// .setColor(mention.accentColor);     only by fetching the user

			const embed = new EmbedBuilder()
				.setTitle(`🙍‍♂️ • User Info`)
				.setDescription(
					`${mention}\n\n🔮 **User Tag** • ${mention.tag}\n🔮 **User Id** • ${
						mention.id
					}\n🔮 **Account Created at** • ${mention.createdAt.toLocaleDateString(
						'en-GB'
					)}`
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
				.setTitle(`👩‍💻 • Server Info`)
				.setDescription(
					`${owner}\n\n🔮 **Name** • ${guild.name}\n🔮 **Members** • ${
						guild.memberCount
					}\n🔮 **Voice / Text Channels** • ${
						guild.channels.cache.filter((c) => c.type == 2).size
					} / ${
						guild.channels.cache.filter((c) => c.type == 0).size
					}\n🔮 **Server Created at** • ${guild.createdAt.toLocaleDateString(
						'en-GB'
					)}`
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
