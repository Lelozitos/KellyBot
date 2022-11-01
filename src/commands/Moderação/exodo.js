const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

module.exports = {
	name: 'exodo',
	aliases: [''],
	category: 'Moderação',
	description: 'Migra todas as pessoas para um canal especifico',
	cooldown: 1,
	usage: '[]',

	run: async (bot, msg, args) => {
		if (!msg.member.hasPermission('MANAGE_CHANNELS'))
			return msg
				.reply('❌ você não tem permissão para usar o comando!')
				.then((m) => m.delete({ timeout: 5000 }));

		if (!msg.member.voice.channel)
			return msg
				.reply(
					'você precisa estar em um canal de voz para que eu possa conectar!'
				)
				.then((m) => m.delete({ timeout: 5000 }));

		const membros = msg.member.voice.channel.members.array();

		membros.forEach((m) => {
			m.voice.setChannel(msg.guild.channels.cache.get(args[0]));
		});

		// fazer com nome do canal instead
	},
};
