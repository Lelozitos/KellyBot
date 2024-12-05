module.exports = {
	name: 'interactionCreate',
	once: false,

	async run(interaction, bot) {
		if (interaction.locale == 'en-GB' || interaction.locale == 'en-US')
			interaction.lang = 'en';
		else interaction.lang = interaction.locale;

		const lang = require(`../../../lang/${interaction.lang}.js`);
		interaction.lang = lang;

		if (interaction.isChatInputCommand()) {
			const { commands } = bot;
			const { commandName } = interaction;
			const command = commands.get(commandName);
			if (!command) return;

			try {
				await command.run(interaction, bot, lang);
			} catch (err) {
				console.log(err);
				await interaction.reply({
					content: 'Something went wrong!',
					ephemeral: true,
				});
			}
		} else if (interaction.isButton()) {
			const { buttons } = bot;
			const { customId } = interaction;
			const button = buttons.get(customId);
			if (!button) return;

			try {
				await button.run(interaction, bot, lang);
			} catch (err) {
				console.log(err);
			}
		} else if (interaction.isSelectMenu()) {
			const { selectMenus } = bot;
			const { customId } = interaction;
			const menu = selectMenus.get(customId);
			if (!menu) return;

			try {
				await menu.run(interaction, bot, lang);
			} catch (err) {
				console.log(err);
			}
		}
	},
};
