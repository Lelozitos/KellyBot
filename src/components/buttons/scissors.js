module.exports = {
	data: {
		name: 'scissors',
	},
	async run(interaction, bot) {
		const rps = bot.commands.get('rps');
		rps.rps(interaction, bot, 'scissors');
	},
};
