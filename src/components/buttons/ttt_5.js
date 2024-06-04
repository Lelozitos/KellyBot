module.exports = {
	data: {
		name: 'ttt_5',
	},
	async run(interaction, bot, lang) {
		const ttt = bot.commands.get('ttt');
		ttt.ttt(interaction, bot, lang, 5);
	},
};
