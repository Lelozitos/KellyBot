const Discord = require('discord.js');

module.exports = {
	name: 'falar',
	aliases: ['flar', 'speak', 'say', 'fala'],
	category: 'Utilidades',
	description: 'Repito uma frase específica',
	cooldown: 10,
	usage: '<mensagem>',

	run: async (bot, msg, args) => {
		//fazer pra vips
		if (
			!msg.member.hasPermission('MANAGE_MESSAGES') &&
			msg.author.id != '211931473564008448'
		)
			return msg.reply('você não ter permissão para usar esse comando!');

		let mensagemfalar = args.join(' ');
		if (!mensagemfalar) return msg.reply('escreva a mensagem para eu falar!');
		msg.channel.send(mensagemfalar);
	},
};
