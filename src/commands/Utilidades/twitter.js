const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

module.exports = {
	name: 'twitter',
	aliases: ['tw', 'frase', 'exposed', 'twt', 'tt'],
	category: 'Utilidades',
	description: 'Eterniza uma frase',
	cooldown: 10,
	usage: '[@mencao | frase]',

	run: async (bot, msg, args) => {
		//fazer para vips
		// if (!args[0]) {
		// 	msg.delete();
		// 	let alo = await msg.channel.messages.fetch({ limit: 100 });
		// 	let messageCollection = new Discord.Collection();

		// 	messageCollection = messageCollection.concat(alo);

		// 	while (alo.size === 100) {
		// 		let idUltimaMensagem = alo.lastKey();
		// 		alo = await msg.channel.messages.fetch({
		// 			limit: 100,
		// 			before: idUltimaMensagem,
		// 		});
		// 		if (alo) messageCollection = messageCollection.concat(alo);
		// 	}

		// 	let mensagens = messageCollection.array();
		// 	mensagens.forEach(async (m) => {
		// 		if (m.content.startsWith('>')) {
		// 			msg.channel.send(m.content);
		// 			m.delete();
		// 		}
		// 	});

		// 	return;
		// }

		let mencao = msg.mentions.members.first();

		var embedTwitter = new Discord.MessageEmbed()
			.setColor('0xFFC300')
			.setTimestamp();

		if (!mencao) {
			embedTwitter
				.setAuthor(msg.author.username, msg.author.displayAvatarURL())
				.setDescription(
					'```' + args.join(' ') + '```\n<@' + msg.author.id + '>'
				);
		} else {
			embedTwitter
				.setAuthor(mencao.user.username, mencao.user.displayAvatarURL())
				.setDescription(
					'```' + args.slice(1).join(' ') + '```\n<@' + mencao.user.id + '>'
				);
		}

		msg.channel.send(embedTwitter);
	},
};
