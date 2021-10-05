const Discord = require('discord.js');

module.exports = {
	name: 'dm',
	aliases: ['men', 'mensagem'],
	category: 'Utilidades',
	description: 'Manda uma mensagem na dm de alguem',
	cooldown: 60,
	usage: '<@mencao | mensagem>',

	run: async (bot, msg, args) => {
		if (msg.author.id != '211931473564008448')
			return msg
				.reply('você não tem permissão para usar esse comando!')
				.then((m) => m.delete({ timeout: 5000 }));
		let mencao = msg.mentions.users.first();

		let mensagemfalar = args.join(' ');

		try {
			mencao.send(mensagemfalar); // erro ao mandar msg para pessoas que nao tem ativado a opcao de receber msg de pessoas no server
		} catch (err) {
			msg
				.reply('o usuário não aceita mensagens na dm!')
				.then((m) => m.delete({ timeout: 5000 }));
		}
	},
};
