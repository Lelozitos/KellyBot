module.exports = {
	name: 'ready',
	once: true,

	async run(bot) {
		// online idle dnd invisible
		// 0 - PLAYING
		// 1 - STREAMING
		// 2 - LISTENING
		// 3 - WATCHING
		// 4 - CUSTOM
		// 5 - COMPETING
		const presenceArray = [
			{
				name: `with your mom`,
				type: 0,
				status: `dnd`,
			},
			{
				name: `my development on Twitch!`,
				type: 1,
				status: `online`,
			},
			{
				name: `all your secrets`,
				type: 2,
				status: `online`,
			},
			{
				name: `/help`,
				type: 2,
				status: `online`,
			},
			{
				name: `${bot.guilds.cache.size} guilds`,
				type: 3,
				status: `online`,
			},
			{
				name: `my dog`,
				type: 3,
				status: `idle`,
			},
			{
				name: `the best Discord Bot`,
				type: 5,
				status: `online`,
			},
		];

		async function pickPresence() {
			const option = Math.floor(Math.random() * presenceArray.length);

			try {
				await bot.user.setPresence({
					status: presenceArray[option].status,
					activities: [
						{
							name: presenceArray[option].name,
							type: presenceArray[option].type,
							url: 'https://www.twitch.tv/Lelozitos',
						},
					],
				});
			} catch (err) {
				console.log(err);
			}
		}

		setInterval(pickPresence, 1000 * 60);
		console.log(`${bot.user.tag} is logged!`);
	},
};
