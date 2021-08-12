const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

module.exports = {
	name: 'sorteio',
	aliases: ['giveaway'],
	category: 'Utilidades',
	description: 'Sorteio ué',
	cooldown: 120,
	usage: '[]',

	run: async (bot, msg, args) => {
		//fazer para vips
		if (
			!args[0].endsWith('s') ||
			!args[0].endsWith('m') ||
			!args[0].endsWith('h') ||
			!args[0].endsWith('d')
		)
			return msg
				.reply('tempo não determinado!')
				.then((m) => m.delete({ timeout: 3000 }));
		const Tempo = {
			s() {},
			m() {},
			h() {},
			d() {},
		};

		let canais = msg.mentions.channels.array().filter((c) => c.type === 'text');
		console.log(canais);

		if (canais[0] === undefined)
			canais[0] = msg.guild.channels.cache.find(
				(channel) =>
					channel.name === 'sorteio' || ('giveaway' && channel.type === 'text')
			);
		console.log(canais);
		if (canais[0] === undefined)
			return msg.reply(
				'sem canal determinado e sem canal nomeado ```sorteio``` ou ```giveaway```'
			);

		// if (msg.mentions.channels.size === 0) {
		// 	canal = msg.guild.channels.cache.find(
		// 		(channel) => channel.name === 'sorteio' || 'giveaway'
		// 	);
		// 	if (!canal)
		// 		return msg.reply(
		// 			'sem canal determinado e sem canal nomeado ```sorteio``` ou ```giveaway```'
		// 		);
		// } else {
		// 	canal = msg.mentions.channels.first();
		// }

		args.splice(args.indexOf(canais[0].toString()), 1);
		while ((index = args.indexOf('')) != -1) {
			args.splice(index, 1);
		}
		console.log(args);
		//console.log(canais[0].name);
	},
};
