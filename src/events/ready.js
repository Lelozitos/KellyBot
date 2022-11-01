module.exports = (bot) => {
	bot.once('ready', async () => {
		console.log(
			`Bot ${bot.user.tag} foi iniciado em ${bot.guilds.cache.size} servidores com sucesso!`
		);

		bot.user.setPresence({
			status: 'dnd', // online idle dnd invisible
			activity: {
				name: `os segredos de ${bot.guilds.cache.size} servers!`,
				url: 'https://www.twitch.tv/Lelozitos',
				type: 'STREAMING', // PLAYING STREAMING LISTENING WATCHING CUSTOM COMPETING
			},
		});
	});
};

// https://discord.js.org/#/docs/discord.js/stable/class/Activity
