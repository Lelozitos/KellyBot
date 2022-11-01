const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
	name: 'wordle',
	aliases: ['worlde', 'termo', 'charada', '5', 'w'],
	category: 'Jogos',
	description: 'Conhece Wordle não?',
	cooldown: 1,
	usage: '[]',

	run: async (bot, msg, args) => {
		const words = require('../../words/wordList');
		const guesses = require('../../words/validGuesses');

		const word = words[Math.floor(Math.random() * words.length) - 1];
		// const tentativas = ['nomes', 'vacas', 'valor', 'turnê', 'ousar', 'polir'];
		let tentativas = [];

		const side = 480;

		let canvas = Canvas.createCanvas(side / 2, side);
		let ctx = canvas.getContext('2d');

		// Pinta o fundo
		ctx.fillStyle = '#36393f';
		ctx.fillRect(0, 0, side / 2, side);

		ctx.font = '70px Courier New';
		ctx.textAlign = 'left';

		// Caixas das letras
		// ctx.strokeStyle = 'Gray';
		// ctx.lineWidth = '3';
		// ctx.lineJoin = 'Round';
		// for (let i = 0; i < 6; i++) {
		// 	for (let j = 0; j < 5; j++) {
		// 		ctx.strokeRect(side / 2 / 5, side / 2 / 5, side / 2 / 5, side / 2 / 5);
		// 	}
		// }

		const pegarGuess = async (guesses) => {
			let filtro = (m) => m.author.id === msg.author.id;

			await msg.channel
				.awaitMessages(filtro, { max: 1, time: 60 * 1000 })
				.then(async (collected) => {
					if (!collected.first()) return (flag = 2);

					const guess = await collected.first().content;

					if (guess.toLowerCase() === 's') return (flag = 2);

					let index = guesses.indexOf(guess.toLowerCase());
					if (index === -1) {
						msg.channel
							.send('Palavra desconhecida! Tente novamente')
							.then((m) => m.delete({ timeout: 5000 }));
						await pegarGuess(guesses);
					} else {
						return guesses[index];
					}
				});
		};

		while (tentativas.length < 6) {
			let i = 0;
			msg.channel.send(word); // aquiiiiiiiiiiiiiiiiiiiiiii
			let letrasWord = word.split('');
			console.log(tentativas);
			tentativas.forEach((e) => {
				let j = 0;

				// var gradient = ctx.createLinearGradient(
				// 	0,
				// 	(side * i) / 6,
				// 	side,
				// 	(side * i) / 6
				// );
				//
				// e.split('').forEach((l) => {
				// 	if (l.localeCompare(letrasWord[j]) === 0) {
				// 		msg.channel.send(e + ' ' + letrasWord[j] + ' ' + j);
				// 		gradient.addColorStop(0.2 * j, 'Green');
				// 		gradient.addColorStop(0.2 * (j + 1), 'Green');
				// 	} else {
				// 		gradient.addColorStop(0.2 * j, 'White');
				// 		gradient.addColorStop(0.2 * (j + 1), 'White');
				// 	}
				// 	j++;
				// });

				let letras = e.split('');
				letras.forEach((l) => {
					if (
						l.localeCompare(letrasWord[j], 'pt', { sensitivity: 'base' }) === 0
					) {
						ctx.fillStyle = 'lime';
					} else if (
						l.localeCompare(letrasWord[0], 'pt', { sensitivity: 'base' }) ===
							0 ||
						l.localeCompare(letrasWord[1], 'pt', { sensitivity: 'base' }) ===
							0 ||
						l.localeCompare(letrasWord[2], 'pt', { sensitivity: 'base' }) ===
							0 ||
						l.localeCompare(letrasWord[3], 'pt', { sensitivity: 'base' }) ===
							0 ||
						l.localeCompare(letrasWord[4], 'pt', { sensitivity: 'base' }) === 0
					) {
						ctx.fillStyle = 'yellow';
					} else {
						ctx.fillStyle = 'white';
					}
					ctx.fillText(
						l.toUpperCase(),
						j * (side / 10) + 5,
						68 * (i + 1) + i * 10
					);
					j++;
				});

				// ctx.fillStyle = gradient;
				// ctx.fillText(e.toUpperCase(), side / 4, 68 * (i + 1) + i * 10);
				i++;
			});

			const imagem = new Discord.MessageAttachment(
				canvas.toBuffer(),
				'wordle.png'
			);

			let embedWordle = new Discord.MessageEmbed()
				.setColor('#00ECC1')
				.setTitle('**🧾 Wordle**')
				.setDescription(
					'**Palavras utilizadas**\n```' +
						tentativas.join(' / ').toUpperCase() +
						'```'
				)
				.attachFiles(imagem)
				.setImage('attachment://wordle.png')
				.setFooter(msg.author.username, msg.author.displayAvatarURL());

			if (tentativas.length === 0)
				embedWordle.setDescription('**Palavras utilizadas**\n``` ```');

			msg.channel.send(embedWordle);

			let guess = await pegarGuess(guesses);
			tentativas.push(guess);
		}
	},
};
