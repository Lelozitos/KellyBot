const Discord = require('discord.js');

module.exports = {
	name: 'enquete',
	aliases: ['poll', 'pesquisa', 'votacao'],
	category: 'Utilidades',
	description: 'Inicia uma enquete',
	cooldown: 15,
	usage: '[quantidade] <pergunta>',

	run: async (bot, msg, args) => {
		if (!msg.member.hasPermission('MANAGE_MESSAGES'))
			return msg
				.reply('você não ter permissão de usar esse comando!')
				.then((m) => m.delete({ timeout: 5000 }));

		if (!args[0])
			return msg
				.reply('coloque a quantidade de alternativas e a pergunta!')
				.then((m) => m.delete({ timeout: 5000 }));

		let quant = 2;
		let pergunta = args.join(' ');

		if (Number.isInteger(parseInt(args[0]))) {
			quant = args[0];
			pergunta = args.slice(1).join(' ');

			if (!args[1])
				return msg
					.reply('coloque a pergunta!')
					.then((m) => m.delete({ timeout: 5000 }));
		}

		if (parseInt(quant) > 10)
			return msg
				.reply('limite de 10 alternativas!')
				.then((m) => m.delete({ timeout: 5000 }));

		const dois = ['👍', '👎'];
		const mais = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

		const embedEnq = new Discord.MessageEmbed()
			.setTitle('**📝 Enquete**')
			.setDescription('```' + pergunta + '```')
			.setColor('0xFFC300')
			.setFooter(msg.author.username, msg.author.displayAvatarURL());

		const m = await msg.channel.send(embedEnq);

		if (quant == 2) {
			dois.forEach((r) => {
				m.react(r);
			});
		} else if (quant > 2) {
			mais.length = parseInt(quant);
			mais.forEach((r) => {
				m.react(r);
			});
		} else {
			return;
		}

		// const Tempo = {
		// 	s() {},
		// 	m() {},
		// 	d() {},
		// };

		// //args[0] para tempo

		// let opcoes = args.slice(1).join(' ').split('/');
		// console.log(opcoes);

		// //msg.channel.send(embedVotacao).then((e) => e.react(emoji));
	},
};
