module.exports = {
	data: {
		name: 'paper',
	},
	async run(interaction, bot) {
		const rps = bot.commands.get('rps');
		rps.rps(interaction, bot, 'paper');
	},
};
