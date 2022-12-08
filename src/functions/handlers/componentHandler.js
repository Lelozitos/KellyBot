const { readdirSync } = require('fs');

module.exports = (bot) => {
	readdirSync(`./components`).forEach((folder) => {
		switch (folder) {
			case 'buttons':
				readdirSync(`./components/${folder}`)
					.filter((f) => f.endsWith('.js'))
					.forEach((file) => {
						const button = require(`../../components/${folder}/${file}`);
						bot.buttons.set(button.data.name, button);
					});
				break;

			case 'selectMenus':
				readdirSync(`./components/${folder}`)
					.filter((f) => f.endsWith('.js'))
					.forEach((file) => {
						const menu = require(`../../components/${folder}/${file}`);
						bot.selectMenus.set(menu.data.name, menu);
					});

				break;

			default:
				break;
		}
	});
};
