module.exports = {
	data: {
		name: 'rock',
	},
	async run(interaction, bot, lang) {
		const rps = bot.commands.get('rps');
		rps.rps(interaction, bot, lang, '🗻');
	},
};
