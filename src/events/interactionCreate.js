module.exports = (bot) => {
	bot.on('interactionCreate', async (inte) => {
		if (!inte.isCommand()) return;

		const { comando } = inte;

		if (comando === 'TESTEE') {
			msg.channel.send('oi');
		}
	});
};
