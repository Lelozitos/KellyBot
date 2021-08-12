const Discord = require('discord.js');

module.exports = {
	name: 'entrar',
	aliases: ['join', 'connect'],
	category: 'Música',
	description: 'Entro em um canal de voz',
	cooldown: 5,
	usage: '[]',

	run: async (bot, msg, args) => {
		if (!msg.member.voice.channel)
			return msg
				.reply(
					'você precisa estar em um canal de voz para que eu possa conectar!'
				)
				.then((m) => m.delete({ timeout: 5000 }));

		if (!msg.guild.me.permissionsIn(msg.member.voice.channel.id).has('CONNECT'))
			return msg
				.reply('não tenho permissões para conectar ao canal!')
				.then((m) => m.delete({ timeout: 5000 }));
		if (!msg.guild.me.permissionsIn(msg.member.voice.channel.id).has('SPEAK'))
			return msg
				.reply('não tenho permissões para falar no canal!')
				.then((m) => m.delete({ timeout: 5000 }));

		msg.member.voice.channel.join();
	},
};
