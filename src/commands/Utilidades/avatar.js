const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

module.exports = {
	name: 'avatar',
	aliases: ['foto', 'icon', 'icone'],
	category: 'Utilidades',
	description: 'Retorna o avatar de alguém',
	cooldown: 5,
	usage: '[@mencao]',

	run: async (bot, msg, args) => {
		let mencao = Funcoes.detectarMencao(msg, args);
		var embedAvatar = new Discord.MessageEmbed()
			.setAuthor('🙍‍♂️ Avatar')
			.setDescription('```' + mencao.user.tag + '```')
			.setImage(mencao.user.displayAvatarURL())
			.setColor('0x00d2ff')
			.setFooter(msg.author.username, msg.author.displayAvatarURL());
		msg.channel.send(embedAvatar);
	},
};
