const Discord = require('discord.js');

module.exports = {
	name: 'anuncio',
	aliases: ['propaganda', 'broadcast'],
	category: 'Utilidades',
	description: 'Manda uma mensagem determinada para todos no servidor',
	cooldown: 600,
	usage: '<mensagem>',

	run: async (bot, msg, args) => {
		if (msg.author.id != '211931473564008448') return;

		if (!msg.guild.available)
			return msg
				.reply('comando indisponível nesse servidor!')
				.then((m) => m.delete({ timeout: 5000 }));

		let membros = msg.guild.members.fetch();

		console.log(membros[0]);

		// membros.forEach((m) => {
		// 	m.send(args.slice(1));
		// });
		//for each guild member => msg them
	},
};
