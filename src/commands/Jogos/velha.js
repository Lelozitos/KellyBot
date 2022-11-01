const Discord = require('discord.js');
const Funcoes = require('../../functions.js');
const Canvas = require('canvas');

module.exports = {
	name: 'velha',
	aliases: ['jogodavelha', 'jdv', '#'],
	category: 'Jogos',
	description: 'Jogo da velha contra a sua menção',
	cooldown: 5,
	usage: '[]',

	run: async (bot, msg, args) => {
		let quadro = [
			['', '', ''],
			['', '', ''],
			['', '', ''],
		];

		let moves = [];
		for (let i = 1; i <= 9; i++) moves.push(i);

		let side = 180;

		let canvas = Canvas.createCanvas(side, side);
		let ctx = canvas.getContext('2d');

		//pinta o fundo
		ctx.fillStyle = '#36393f';
		ctx.fillRect(0, 0, side, side);

		//cria as linhas
		ctx.fillStyle = '#00ECC1';
		for (let i = 1; i <= 2; i++) {
			ctx.fillRect((i * side) / 3, 0, 1, side);
			ctx.fillRect(0, (i * side) / 3, side, 1);
		}

		//Teste para o quadro
		// for (let i = 0; i < 3; i++) {
		// 	for (let j = 0; j < 3; j++) {
		// 		draw(ctx, quadro[i][j], i * 3 + j, side);
		// 	}
		// }

		flag = undefined;

		let mencao = msg.mentions.members.first();
		if (mencao) {
			filtro = (m) => m.author.id === mencao.id;
		} else {
			filtro = (m) => m.author.id === msg.author.id;
		}

		let xis = true;

		const pegarMove = async (moves) => {
			let filtro;

			if (mencao && !xis) {
				filtro = (m) => m.author.id === mencao.id;
			} else {
				filtro = (m) => m.author.id === msg.author.id;
			}

			await msg.channel
				.awaitMessages(filtro, { max: 1, time: 30 * 1000 })
				.then(async (collected) => {
					if (!collected.first()) return (flag = 2);
					const move = await parseInt(collected.first().content);
					if (move === 0) return (flag = 2);

					let index = moves.indexOf(move);
					if (index === -1) {
						msg
							.reply('movimento inválido! Tente novamente')
							.then((m) => m.delete({ timeout: 5000 }));
						await pegarMove(moves);
					} else {
						let i = Math.floor((move - 1) / 3);
						let j = (move - 1) % 3;
						if (xis) {
							draw(ctx, 'X', move - 1, side);
							quadro[i][j] = 'X';
						} else {
							draw(ctx, 'O', move - 1, side);
							quadro[i][j] = 'O';
						}

						moves.splice(index, 1);
						xis = !xis;
					}
				});
		};

		let acabado = false;
		while (!acabado) {
			const imagem = new Discord.MessageAttachment(
				canvas.toBuffer(),
				'velha.png'
			);

			let embedRgb = new Discord.MessageEmbed()
				.setColor('#00ECC1')
				.setTitle('**👩‍🦳 Velha**')
				.setDescription('**Lances disponíveis**\n```' + moves.join('/') + '```')
				.attachFiles(imagem)
				.setImage('attachment://velha.png')
				.setFooter(msg.author.username, msg.author.displayAvatarURL());

			if (moves.length === 0)
				embedRgb.setDescription('**Lances disponíveis**\n``` ```');

			msg.channel.send(embedRgb);

			if (checarVenc()) {
				acabado = true;
				break;
			}

			await pegarMove(moves);
			if (flag === 2) {
				return msg.channel.send('Jogo acabado por inatividade!');
			}
		}

		if (acabado) {
			if (!mencao) mencao = msg.author;
			if (vencedor == 'X')
				return msg.channel.send(
					`🎉 ${msg.author.username} ganhou de ${mencao.user.username}!`
				);
			else if (vencedor == 'O') {
				return msg.channel.send(
					`🎉 ${mencao.user.username} ganhou de ${msg.author.username}!`
				);
			} else if (vencedor == 'XO') return msg.channel.send(`Empate!!`);
		}

		function checarVenc() {
			for (let i = 0; i < 3; i++) {
				//horizontal
				if (igual(quadro[i][0], quadro[i][1], quadro[i][2])) {
					vencedor = quadro[i][1];
					return true;
				}

				//vertical
				if (igual(quadro[0][i], quadro[1][i], quadro[2][i])) {
					vencedor = quadro[1][i];
					return true;
				}
			}

			//diagonal
			if (
				igual(quadro[0][0], quadro[1][1], quadro[2][2]) ||
				igual(quadro[2][0], quadro[1][1], quadro[0][2])
			) {
				vencedor = quadro[1][1];
				return true;
			}

			if (moves.length === 0) {
				vencedor = 'XO';
				return true;
			}
			return false;
		}

		function igual(a, b, c) {
			return a == b && b == c && a != '';
		}

		// https://www.youtube.com/watch?v=l-hh51ncgDI
		function minimax(posicao, prof, xis) {
			if (prof === 0 || checarVenc(posicao)) {
				return pontuacao;
			}

			if (xis) {
				let max = -Infinity;
			}
		}
	},
};

function draw(ctx, forma, pos, side) {
	let hor = Math.floor(pos / 3);
	let ver = pos % 3;

	// ctx.fillText(
	// 	forma,
	// 	(ver * side) / 3 + side / 12,
	// 	(hor * side) / 3 - side / 12
	// );

	ctx.strokeStyle = '#00ECC1';
	switch (forma) {
		case 'X':
			ctx.beginPath();

			ctx.moveTo((ver * side) / 3 + side / 12, (hor * side) / 3 + side / 12);
			ctx.lineTo(
				((ver + 1) * side) / 3 - side / 12,
				((hor + 1) * side) / 3 - side / 12
			);
			ctx.stroke();

			ctx.moveTo(
				((ver + 1) * side) / 3 - side / 12,
				(hor * side) / 3 + side / 12
			);
			ctx.lineTo(
				(ver * side) / 3 + side / 12,
				((hor + 1) * side) / 3 - side / 12
			);
			ctx.stroke();
			break;

		case 'O':
			ctx.beginPath();
			ctx.fillStyle = '#00ECC1';

			ctx.arc(
				(ver * side) / 3 + side / 6,
				((hor + 1) * side) / 3 - side / 6,
				side / 10,
				0,
				2 * Math.PI
			);
			ctx.stroke();
			break;
	}
}
