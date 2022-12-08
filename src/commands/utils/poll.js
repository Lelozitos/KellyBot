const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('poll').setDescription('Set'),

	async run(interaction, bot) {},
};
