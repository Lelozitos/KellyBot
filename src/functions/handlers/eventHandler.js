const { readdirSync } = require('fs');

module.exports = (bot) => {
	bot.events = readdirSync('./events/');

	bot.events.forEach((folder) => {
		switch (folder) {
			case 'client':
				readdirSync(`./events/${folder}`)
					.filter((f) => f.endsWith('.js'))
					.forEach((eventFile) => {
						const event = require(`../../events/${folder}/${eventFile}`);
						if (event.once)
							bot.once(event.name, (...args) => event.run(...args, bot));
						else bot.on(event.name, (...args) => event.run(...args, bot));
					});
				break;

			default:
				break;
		}
	});
};
