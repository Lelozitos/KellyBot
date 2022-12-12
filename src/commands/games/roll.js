const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setNameLocalizations({})
		.setDescription('Roll a dice')
		.setDescriptionLocalizations({})
		.addStringOption((option) =>
			option
				.setName('command')
				.setNameLocalizations({
					de: 'kommando',
					'es-ES': 'comando',
					'pt-BR': 'comando',
				})
				.setDescription('Example: [2d20+5]')
				.setDescriptionLocalizations({
					de: 'Beispiel: [2d20+5]',
					'es-ES': 'Ejemplo: [2d20+5]',
					'pt-BR': 'Exemplo: [2d20+5]',
				})
				.setRequired(true)
		)
		.addBooleanOption((option) =>
			option
				.setName('silent')
				.setNameLocalizations({
					de: 'leise',
					'es-ES': 'silencioso',
					'pt-BR': 'silencioso',
				})
				.setDescription('Only show you the result?')
				.setDescriptionLocalizations({
					de: 'Nur Ihnen das Ergebnis zeigen?',
					'es-ES': '¿Mostrar el resultado solo a ti?',
					'pt-BR': 'Mostrar o resultado só para você?',
				})
		),

	async run(interaction, bot, lang) {
		let args = interaction.options.getString('command').toLowerCase().trim();
		let argsArray = args;
		argsArray = argsArray.split('d').join('+').split('+');
		argsArray = argsArray.map((e) => parseInt(e));
		if (argsArray.length === 2) argsArray.push(0);
		if (argsArray.length === 1) argsArray.unshift(1);
		if (isNaN(argsArray[0])) argsArray[0] = 1;
		if (argsArray[0] > 10_000_000 || argsArray[1] > 10_000_000)
			return interaction.reply({ content: lang['Invalid number'] });

		let sum = argsArray[2];
		let values = [];
		let temp = 0;
		for (let i = 0; i < argsArray[0]; i++) {
			temp = Math.floor(Math.random() * argsArray[1]) + 1;
			sum += temp;
			values.push(temp);
		}

		// const embed = new EmbedBuilder()
		// 	.setDescription(`${sum} (${values.join(' ')})`)
		// 	// .setDescription(values.join(''))
		// 	.setFooter({
		// 		iconURL: interaction.user.displayAvatarURL(),
		// 		values: interaction.user.username,
		// 	})
		// 	.setTimestamp();
		/////////////////////////////////////////////////////
		// const embed = new EmbedBuilder()
		// 	.setAuthor({
		// 		name: `${sum} (${values.join(' ')})`,
		// 		iconURL: interaction.user.displayAvatarURL(),
		// 	})
		// 	// .setDescription(values.join(''))
		// 	.setTimestamp();

		// let max = argsArray[0] * argsArray[1] + argsArray[2];

		// if (sum <= (max / 100) * 30) embed.setColor(0xff0000);
		// if (sum > (max / 100) * 30 && sum < (max / 100) * 70)
		// 	embed.setColor(0xfcff00);
		// if (sum >= (max / 100) * 70) embed.setColor(0x00ff23);

		// await interaction.reply({ embeds: [embed] });

		if (values.length > 100) values.length = 100;
		let text = ` \`\`\`js\n# ${sum}\n${lang['Details']}:[${args} (${values})]\`\`\` `;

		if (interaction.options.getBoolean('silent'))
			return interaction.reply({ content: text, ephemeral: true });
		interaction.reply({ content: text });
	},
};
