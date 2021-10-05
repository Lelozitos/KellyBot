const Discord = require('discord.js');

module.exports = {
	name: 'spam',
	aliases: ['flood', 'spamar'],
	category: 'Utilidades',
	description: 'Manda várias mensagens para uma pessoa específica',
	cooldown: 60,
	usage: '<@mencao | quantidade>',

	run: async (bot, msg, args) => {
		if (msg.author.id != '211931473564008448')
			return msg.reply('Nananinanão').then((m) => m.delete({ timeout: 5000 }));
		let mencao = msg.mentions.users.first();
		let tempo = parseInt(args[1]);
		if (tempo >= 20)
			return msg
				.reply('o número máximo de mensagens é de 20')
				.then((m) => m.delete({ timeout: 5000 }));
		if (isNaN(tempo))
			return msg
				.reply('quantidade inválida!')
				.then((m) => m.delete({ timeout: 5000 }));

		let listaMensagens = [
			'Bó LoL',
			'Invoco-lhe',
			'Apresente-se',
			'Summono-lhe-nos',
			'Lhe Invoco',
			'Summone-lhe-eu',
			'Pare de gadar',
			'Vai de preencher',
			'Namorar não dá xp',
			'Fechas time',
		];

		mencao.send(`${tempo} mensagens mandadas por ${msg.author.tag}!`);
		setTimeout(excuteMethod, 1000);

		function excuteMethod() {
			mencao.send(
				'`' +
					listaMensagens[Math.floor(Math.random() * listaMensagens.length)] +
					'`'
			);
			tempo--;
			if (tempo > 0) setTimeout(excuteMethod, 100);
		}
	},
};
