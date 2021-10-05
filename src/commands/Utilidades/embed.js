const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

module.exports = {
	name: 'embed',
	aliases: [''],
	category: 'Utilidades',
	description: 'Cria um embed personalizado',
	cooldown: 2,
	usage: '[]',

	run: async (bot, msg, args) => {
		const embedPers = new Discord.MessageEmbed()
			.setTitle('🐦 Twitter')
			.setDescription(
				'**Como usar o comando Twitter:**\n`>tw @mencao frase`\nCaso não haja a @mencao, a frase fica como sua autoria'
			)
			.setColor('0x00d2ff')
			.setThumbnail(
				'https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1.png'
			);

		msg.channel.send(embedPers);
	},
};
