const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Shows avatar of someone')
		.addUserOption((option) =>
			option.setName('user').setDescription('User to fetch their avatar')
		),

	async run(interaction, bot) {
		let mention;
		if (interaction.options.data != 0)
			mention = interaction.options.getUser('user');
		else mention = interaction.user;

		const embed = new EmbedBuilder()
			.setAuthor({
				iconURL: mention.displayAvatarURL({ dynamic: true }),
				name: mention.tag,
			})
			.setImage(mention.displayAvatarURL({ size: 4096, dynamic: true }))
			.setColor(0x00d2ff)
			.setFooter({
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
				text: interaction.user.username,
			});

		await interaction.reply({ embeds: [embed] });
	},
};
