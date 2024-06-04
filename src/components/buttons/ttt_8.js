module.exports = {
	data: {
		name: 'ttt_8',
	},
	async run(interaction, bot, lang) {
		const ttt = bot.commands.get('ttt');
		ttt.ttt(interaction, bot, lang, 8);
	},
};
