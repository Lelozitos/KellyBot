const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rps')
		.setNameLocalizations({})
		.setDescription('Rock Paper Scissors')
		.setDescriptionLocalizations({}),

	async run(interaction, bot, lang) {
		const rock = new ButtonBuilder()
			.setCustomId('rock')
			.setEmoji('🗻')
			.setStyle(ButtonStyle.Secondary);
		const paper = new ButtonBuilder()
			.setCustomId('paper')
			.setEmoji('📃')
			.setStyle(ButtonStyle.Secondary);
		const scissors = new ButtonBuilder()
			.setCustomId('scissors')
			.setEmoji('✂')
			.setStyle(ButtonStyle.Secondary);

		await interaction.reply({
			components: [new ActionRowBuilder().addComponents(rock, paper, scissors)],
		});
	},

	async rps(interaction, bot, rps) {
		const options = ['rock', 'paper', 'scissors'];
		const botChoice = options[Math.floor(Math.random() * options.length)];

		if (
			(rps === 'rock' && botChoice === 'scissors') ||
			(rps === 'paper' && botChoice === 'rock') ||
			(rps === 'scissors' && botChoice === 'paper')
		) {
			interaction.reply('Won!');
		} else if (rps === botChoice) {
			interaction.reply('Draw!');
		} else {
			interaction.reply('Loss!');
		}
	},
};
