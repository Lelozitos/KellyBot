module.exports = {
	data: {
		name: 'rock',
	},
	async run(interaction, bot) {
		const rps = bot.commands.get('rps');
		rps.rps(interaction, bot, 'rock');
	},
};
