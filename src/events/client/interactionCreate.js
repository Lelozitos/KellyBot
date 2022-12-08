module.exports = {
	name: 'interactionCreate',
	once: false,

	async run(interaction, bot) {
		if (interaction.isChatInputCommand()) {
			const { commands } = bot;
			const { commandName } = interaction;
			const command = commands.get(commandName);
			if (!command) return;

			try {
				await command.run(interaction, bot);
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
				await button.run(interaction, bot);
			} catch (err) {
				console.log(err);
			}
		} else if (interaction.isSelectMenu()) {
			const { selectMenus } = bot;
			const { customId } = interaction;
			const menu = selectMenus.get(customId);
			if (!menu) return;

			try {
				await menu.run(interaction, bot);
			} catch (err) {
				console.log(err);
			}
		}
	},
};
