const Discord = require('discord.js');

module.exports = {
	name: '8ball',
	aliases: ['bola8', 'serase'],
	category: 'Jogos',
	description: 'Rola respostas definidas para uma pergunta',
	cooldown: 2,
	usage: '<pergunta>',

	run: async (bot, msg, args) => {
		if (!args[0])
			return msg
				.reply('sua pergunta está incompleta!')
				.then((m) => m.delete({ timeout: 3000 }));
		let respostas8 = [
			'Sim.',
			'Não.',
			'Talvez.',
			'Provavelmente.',
			'Improvável.',
			'Eu não sei.',
		];

		let resultado = Math.floor(Math.random() * respostas8.length);

		var embed8 = new Discord.MessageEmbed()
			.setTitle('🎱 Bola 8')
			.setDescription('```' + args.join(' ') + '```')
			.addField(respostas8[resultado], '\u200B')
			.setFooter(msg.author.username, msg.author.displayAvatarURL());

		msg.channel.send(embed8);
	},
};
