module.exports = {
	data: {
		name: 'ttt_2',
	},
	async run(interaction, bot, lang) {
		const ttt = bot.commands.get('ttt');
		ttt.ttt(interaction, bot, lang, 2);
	},
};
