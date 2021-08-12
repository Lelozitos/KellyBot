const Discord = require('discord.js');

module.exports = {
	name: 'limpar',
	aliases: ['apagar', 'clear'],
	category: 'Utilidades',
	description: 'Deleta uma determinada quantidade de mensagens',
	cooldown: 10,
	usage: '<quantidade>',

	run: async (bot, msg, args) => {
		if (
			!msg.member.hasPermission('MANAGE_MESSAGES') &&
			!msg.author.id == '211931473564008448'
		)
			return msg
				.reply('você não ter permissão de usar esse comando!')
				.then((m) => m.delete({ timeout: 5000 }));
		if (!args[0])
			return msg
				.reply('selecione a quantidade de mensagens que você quer apagar')
				.then((m) => m.delete({ timeout: 5000 }));

		if (args[0] == msg.mentions.users.first()) {
			// let i = 0;
			// msg.channel.messages.forEach((msg) => {
			//     if (msg.author.id === msg.mentions.users.first().id) {
			//         msg.delete();
			//         i++;
			//     }
			//     msg.channel.send(`Foram limpas ${i} mensagens de ${msg.mentions.users.first().tag}!`).then(m => m.delete({timeout:3000}));
			// });
		} else if (Number.isInteger(parseInt(args[0]))) {
			if (parseInt(args[0]) < 1)
				return msg
					.reply('só consigo apagar pelo menos 1 mensagem!')
					.then((m) => m.delete({ timeout: 5000 }));

			// erro ao deletar msgs mais anigas do que 14 dias
			try {
				await msg.channel.bulkDelete(args[0]).then(() => {
					msg.channel
						.send(`Foram limpas ${args[0]} mensagens!`)
						.then((m) => m.delete({ timeout: 5000 }));
				});
			} catch (err) {
				msg
					.reply('não é possível deletar mensagens de 14 dias atrás!')
					.then((m) => m.delete({ timeout: 5000 }));
			}
		} else {
			msg.reply('variável inválida!').then((m) => m.delete({ timeout: 3000 }));
		}
	},
};
