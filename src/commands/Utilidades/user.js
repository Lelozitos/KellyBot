const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

module.exports = {
	name: 'user',
	aliases: ['usuario', 'uinfo'],
	category: 'Utilidades',
	description: 'Dá as informações de um usuário',
	cooldown: 5,
	usage: '[]',

	run: async (bot, msg, args) => {
		let mencao = Funcoes.detectarMencao(msg, args);
		var embedUser = new Discord.MessageEmbed()
			.setAuthor(mencao.user.tag, mencao.user.displayAvatarURL())
			.setTitle('🙍‍♂️ Informação do Usuário')
			.setThumbnail(mencao.user.displayAvatarURL())
			.addFields(
				{ name: `a`, value: `r` },
				{
					name: 'Conta criada em:',
					value: mencao.user.createdAt,
				}
			)
			.setFooter(msg.author.username, msg.author.displayAvatarURL());

		if (mencao.user.id == '211931473564008448')
			embedUser.setAuthor(
				msg.author.tag,
				msg.author.displayAvatarURL(),
				'https://instagram.com/Lelozitos'
			);

		msg.channel.send(embedUser);

		// const fullNumber = '2034399002125581';
		// const last4Digits = fullNumber.slice(-4);
		// const maskedNumber = last4Digits.padStart(fullNumber.length, '*');

		// console.log(maskedNumber);
		// // expected output: "************5581"
	},
};
