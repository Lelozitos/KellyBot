const Discord = require('discord.js');
const Canvas = require('canvas');
const { Chess } = require('chess.js');

//https://github.com/jhlywa/chess.js/blob/master/chess.js

const pecas = './images/xadrez/';

module.exports = {
	name: 'xadrez',
	aliases: ['chess', 'x'],
	category: 'Jogos',
	description: 'Inicia um jogo de xadrez ue',
	cooldown: 20,
	usage: '[]',

	run: async (bot, msg, args) => {
		var colunas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		var linhas = ['8', '7', '6', '5', '4', '3', '2', '1'];

		const chess = new Chess();

		var inicial;
		var mencao = msg.mentions.members.first();

		if (mencao) {
			if (!args[1])
				chess.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
			else if (chess.validate_fen(args.slice(1).join(' ')).valid)
				chess.load(args.slice(1).join(' '));
			else
				return msg
					.reply('fen inválido! Tente novamente')
					.then((m) => m.delete({ timeout: 5000 }));
		} else {
			if (!args[0])
				chess.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
			else if (chess.validate_fen(args.join(' ')).valid)
				chess.load(args.join(' '));
			else
				return msg
					.reply('fen inválido! Tente novamente')
					.then((m) => m.delete({ timeout: 5000 }));
		}

		//Cria o canvas
		let canvas = Canvas.createCanvas(480, 480);
		let ctx = canvas.getContext('2d');

		flag = undefined;

		const pegarMove = async (moves) => {
			let filtro;

			if (mencao && chess.turn() === 'b') {
				filtro = (m) => m.author.id === mencao.id;
			} else {
				filtro = (m) => m.author.id === msg.author.id;
			}

			await msg.channel
				.awaitMessages(filtro, { max: 1, time: 60 * 1000 })
				.then(async (collected) => {
					if (!collected.first()) return (flag = 2);
					const move = await collected.first().content;
					if (move.toLowerCase() === 's') return (flag = 2);
					if (move.toLowerCase() === 'fen') {
						msg.channel.send('Fen da partida `' + chess.fen() + '`');
						await pegarMove(moves);
						return;
					}

					if (moves.indexOf(move) === -1) {
						msg.channel
							.send('Movimento inválido! Tente novamente')
							.then((m) => m.delete({ timeout: 5000 }));
						await pegarMove(moves);
					} else {
						chess.move(move);
					}
				});
		};

		while (!chess.game_over()) {
			//Renderiza o tabuleiro
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 8; j++) {
					ctx.beginPath();
					ctx.fillStyle = ['#e6dbf1', '#997db5'][(i + j) % 2];
					ctx.fillRect(j * 60, i * 60, 60, 60);
					ctx.closePath();
				}
			}

			//carrega as pecas iniciais no tabuleiro
			for (let i = 0; i < 8; i++) {
				if (i % 2 == 0) ctx.fillStyle = '#e6dbf1';
				else ctx.fillStyle = '#997db5';

				ctx.font = '18px Arial';
				ctx.fillText(colunas[i], i * 60 + 2, 480);

				let array = chess.board()[i];
				for (let j = 0; j < 8; j++) {
					if (j % 2 == 0) ctx.fillStyle = '#e6dbf1';
					else ctx.fillStyle = '#997db5';

					ctx.font = '18px Arial';
					ctx.fillText(linhas[j], 470, (j + 1) * 60);

					if (array[j]) {
						peca = array[j].type + array[j].color;
						await carregar[peca]();
						ctx.drawImage(eval(peca), j * 60, i * 60, 59, 59);
					}
				}
			}
			const moves = chess.moves();

			const imagem = new Discord.MessageAttachment(
				canvas.toBuffer(),
				'tabuleiro.png'
			);

			let embedXadrez = new Discord.MessageEmbed()
				.setColor('#997db5')
				.setTitle('**♟ Xadrez**')
				.setDescription(
					'**Lances disponíveis**\n```' + chess.moves().join('/') + '```'
				)
				.attachFiles(imagem)
				.setImage('attachment://tabuleiro.png')
				.setFooter(msg.author.username, msg.author.displayAvatarURL());

			msg.channel.send(embedXadrez);

			await pegarMove(moves);
			if (flag === 2) {
				return msg.channel.send(
					'Jogo acabado por inatividade! Use o Fen se quiser continuar `' +
						chess.fen() +
						'`'
				);
			}
			// descarregar a peca movida, carregar a nova
		}

		if (chess.in_checkmate) {
			if (!mencao) mencao = msg.author;
			if (chess.turn() === 'b')
				msg.channel.send(
					`🎉 ${mencao.user.username} ganhou de ${msg.author.username}!`
				);
			else
				msg.channel.send(
					`🎉 ${msg.author.username} ganhou de ${mencao.user.username}!`
				);
		} else if (chess.in_draw) {
			msg.channel.send(
				`O jogo entre ${msg.author.username} e ${mencao.user.username} empatous!`
			);
		}
	},
};

//Carregar as peças no canvas
const carregar = {
	async pw() {
		peca = await Canvas.loadImage('./images/chess/Pw.png');
	},
	async pb() {
		peca = await Canvas.loadImage('./images/chess/Pb.png');
	},
	async nw() {
		peca = await Canvas.loadImage('./images/chess/Nw.png');
	},
	async nb() {
		peca = await Canvas.loadImage('./images/chess/Nb.png');
	},
	async bw() {
		peca = await Canvas.loadImage('./images/chess/Bw.png');
	},
	async bb() {
		peca = await Canvas.loadImage('./images/chess/Bb.png');
	},
	async rw() {
		peca = await Canvas.loadImage('./images/chess/Rw.png');
	},
	async rb() {
		peca = await Canvas.loadImage('./images/chess/Rb.png');
	},
	async qw() {
		peca = await Canvas.loadImage('./images/chess/Qw.png');
	},
	async qb() {
		peca = await Canvas.loadImage('./images/chess/Qb.png');
	},
	async kw() {
		peca = await Canvas.loadImage('./images/chess/Kw.png');
	},
	async kb() {
		peca = await Canvas.loadImage('./images/chess/Kb.png');
	},
};
