module.exports = (bot) => {
	bot.once('ready', async () => {
		console.log(
			`Bot ${bot.user.tag} foi iniciado em ${bot.guilds.cache.size} servidores com sucesso!`
		);

		bot.user.setPresence({
			status: 'online', //online idle dnd invisible
			activity: {
				name: `os segredos de ${bot.guilds.cache.size} servers!`,
				url: 'https://www.twitch.tv/Lelozitos',
				type: 'WATCHING', //WATCHING STREAMING PLAYING
			},
		});
	});
};
