const Discord = require('discord.js');

module.exports = {
	name: 'dado',
	aliases: ['rolar', 'd'],
	category: 'Jogos',
	description:
		'Rola um número determinado de dados (pode se adicionar números fixos)',
	cooldown: 1,
	usage: '<número> [+d20+32+d40]',

	run: async (bot, msg, args) => {
		if (!args[0]) return msg.reply('coloque um número para rodar um dado!');
		if (parseInt(args[0]) <= 0)
			return msg
				.reply(`não é possivel rodar um dado de ${args[0]} lados`)
				.then((m) => m.delete({ timeout: 3000 }));
		if (!Number.isInteger(parseInt(args[0])))
			return msg
				.reply(`${args[0]} não é um número válido!`)
				.then((m) => m.delete({ timeout: 3000 }));

		let argsDado = args.join(' ').split('+').slice(1);
		let index;
		let soma = 0;
		let arrayOutrosDados = [];
		let dado = Math.floor(Math.random() * parseInt(args[0]) + 1);
		let resultado = dado;
		let intDado = [];
		let seSoma = false;
		let resultadoTotal = parseInt(args[0]);
		let arrayResultadoTotal = [];

		while ((index = argsDado.indexOf('')) != -1) {
			argsDado.splice(index, 1);
		}

		let embedDado = new Discord.MessageEmbed();

		if (argsDado.length > 6)
			return msg
				.reply(`são muitas operações simultâneas!`)
				.then((m) => m.delete({ timeout: 3000 }));

		if (argsDado.length > 0) {
			argsDado.forEach((element) => {
				if (!Number.isInteger(parseInt(element)) && !element.startsWith('d'))
					return msg
						.reply(`${element} não é um argumento válido!`)
						.then((m) => m.delete({ timeout: 3000 }));
				if (element.startsWith('d')) {
					try {
						let outrosDados = Math.floor(
							Math.random() * parseInt(element.slice(1)) + 1
						);
						arrayOutrosDados.push(outrosDados);

						arrayResultadoTotal.push(parseInt(element.slice(1)));
					} catch (e) {
						msg
							.reply(`${element.slice(1)} não é um argumento válido!aaaaaaa`)
							.then((m) => m.delete({ timeout: 3000 }));
					}
				} else {
					intDado.push(parseInt(element));
					soma = intDado.reduce((a, b) => a + b, 0);
					resultado = dado + soma;
					seSoma = true;
				}
			});

			if (argsDado.filter((x) => !x.startsWith('d').length > 0)) {
				embedDado
					.setDescription(`Somados com ${soma}`)
					.addField('\u200b', '\u200b')
					.addField(`Dado 1 (${parseInt(args[0])})`, dado);
			}
			if (argsDado.filter((x) => x.startsWith('d')).length == 1) {
				embedDado.addField(
					`Dado 2 (${parseInt(arrayResultadoTotal[0])})`,
					arrayOutrosDados[0]
				);
			}
			if (argsDado.filter((x) => x.startsWith('d')).length == 2) {
				embedDado
					.addField(
						`Dado 2 (${parseInt(arrayResultadoTotal[0])})`,
						arrayOutrosDados[0]
					)
					.addField(
						`Dado 3 (${parseInt(arrayResultadoTotal[1])})`,
						arrayOutrosDados[1]
					);
			}
			if (argsDado.filter((x) => x.startsWith('d')).length == 3) {
				embedDado
					.addField(
						`Dado 2 (${parseInt(arrayResultadoTotal[0])})`,
						arrayOutrosDados[0]
					)
					.addField(
						`Dado 3 (${parseInt(arrayResultadoTotal[1])})`,
						arrayOutrosDados[1]
					)
					.addField(
						`Dado 4 (${parseInt(arrayResultadoTotal[2])})`,
						arrayOutrosDados[2]
					);
			}
			if (argsDado.filter((x) => x.startsWith('d')).length > 3)
				return msg
					.reply(`são muitas operações simultâneas!`)
					.then((m) => m.delete({ timeout: 3000 }));
		} else {
			embedDado.setDescription(`Dado de ${parseInt(args[0])} lados`);
		}

		let soma1 = arrayOutrosDados.reduce((a, b) => a + b, 0);
		resultado = resultado + soma1;

		let cor;
		resultadoTotal =
			resultadoTotal + arrayResultadoTotal.reduce((a, b) => a + b, 0);

		if (dado + soma1 <= (resultadoTotal / 100) * 30) cor = '0xFF0000';
		if (
			dado + soma1 > (resultadoTotal / 100) * 30 &&
			dado < (resultadoTotal / 100) * 70
		)
			cor = '0xFCFF00';
		if (dado + soma1 >= (resultadoTotal / 100) * 70) cor = '0x00FF23';

		embedDado
			.setAuthor(msg.author.username, msg.author.displayAvatarURL())
			.setColor(cor)
			.setTitle(resultado)
			.setTimestamp();

		if (msg.author.id == '211931473564008448')
			embedDado.setAuthor(
				msg.author.username,
				msg.author.displayAvatarURL(),
				'https://instagram.com/Lelozitos'
			);

		msg.channel.send(embedDado);
	},
};
