const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rps')
		.setNameLocalizations({})
		.setDescription('Rock Paper Scissors')
		.setDescriptionLocalizations({}),

	async run(interaction, bot, lang) {
		const rock = new ButtonBuilder()
			.setCustomId('rps_rock')
			.setEmoji('🗻')
			.setStyle(ButtonStyle.Secondary);
		const paper = new ButtonBuilder()
			.setCustomId('rps_paper')
			.setEmoji('📃')
			.setStyle(ButtonStyle.Secondary);
		const scissors = new ButtonBuilder()
			.setCustomId('rps_scissors')
			.setEmoji('✂')
			.setStyle(ButtonStyle.Secondary);

		const embed = new EmbedBuilder()
			.setTitle(lang['Rock Paper Scissors'])
			.setColor('#7B7D7D')
			.setFooter({
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
				text: interaction.user.username,
			});

		await interaction.reply({
			embeds: [embed],
			components: [new ActionRowBuilder().addComponents(rock, paper, scissors)],
		});
	},

	async rps(interaction, bot, lang, rps) {
		const options = ['🗻', '📃', 'scissors'];
		const botChoice = options[Math.floor(Math.random() * options.length)];

		const embed = new EmbedBuilder()
			.setTitle(`${rps} ${lang['Rock Paper Scissors']}`)
			.setFooter({
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
				text: interaction.user.username,
			});

		if (
			(rps === '🗻' && botChoice === '✂') ||
			(rps === '📃' && botChoice === '🗻') ||
			(rps === '✂' && botChoice === '📃')
		) {
			embed.setDescription(lang["You've won"]);
			embed.setColor('#00FF00');
		} else if (rps === botChoice) {
			embed.setDescription(lang['Draw']);
			embed.setColor('#FFFF00');
		} else {
			embed.setDescription(lang["You've lost"]);
			embed.setColor('#FF0000');
		}

		interaction.update({ embeds: [embed] });
	},
};
