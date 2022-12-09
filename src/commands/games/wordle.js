const {
	SlashCommandBuilder,
	EmbedBuilder,
	AttachmentBuilder,
} = require('discord.js');
const { createCanvas } = require('canvas');

// There is a problem regarding the coloring system, meaning that multiple letters can
// receive the same color even though there is only one letter in the secret word

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wordle')
		.setDescription('Start a wordle game'),

	async run(interaction, bot) {
		const tries = [];
		const side = 480;

		let canvas = createCanvas(side / 2, side);
		let ctx = canvas.getContext('2d');

		ctx.fillStyle = '#36393f';
		ctx.fillRect(0, 0, side / 2, side);

		ctx.font = '70px Courier New';
		ctx.textAlign = 'left';

		let image = new AttachmentBuilder(canvas.toBuffer(), {
			name: 'wordle.png',
		});

		const guesses = require(`../../../words/wordle/guesses`);
		const words = require(`../../../words/wordle/words`);
		const word = words[Math.floor(Math.random() * words.length)];

		const embed = new EmbedBuilder()
			.setColor('#00ECC1')
			.setTitle('**🧾 Wordle**')
			.setImage('attachment://wordle.png')
			.setFooter({
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
				text: interaction.user.username,
			});

		await interaction.reply({ embeds: [embed], files: [image] });

		const filter = (msg) => msg.author.id === interaction.user.id;

		const collector = await interaction.channel.createMessageCollector({
			filter,
			time: 120 * 1000,
			maxProcessed: 12,
		});
		console.log(word);

		collector.on('collect', (msg) => {
			if (!guesses.includes(msg.content.toLowerCase()))
				return interaction.followUp({
					content: 'Unknown word!',
					ephemeral: true,
				});

			tries.push(msg.content.toUpperCase());

			let i = 0;
			msg.content.split('').forEach((letter) => {
				if (letter === word[i]) ctx.fillStyle = 'green';
				else if (word.includes(letter)) ctx.fillStyle = 'yellow';
				else ctx.fillStyle = 'white';

				ctx.fillText(
					letter.toUpperCase(),
					i * (side / 10) + 5,
					78 * tries.length - 12
				);
				i++;
			});

			image = new AttachmentBuilder(canvas.toBuffer(), {
				name: 'wordle.png',
			});

			embed.setDescription(
				'**Used Words**\n```' + tries.join(' / ').toUpperCase() + '```'
			);
			interaction.editReply({ embeds: [embed], files: [image] });

			if (msg.content === word) {
				collector.stop();
				return interaction.followUp({ content: "You've won!" });
			}

			if (tries.length == 6) {
				collector.stop();
				return interaction.followUp({
					content: `You've lost! The correct word was \`${word}\``,
				});
			}
		});
	},
};
