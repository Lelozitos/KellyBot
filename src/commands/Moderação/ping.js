const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	aliases: ['pong'],
	category: 'Moderação',
	description: 'Minha latência',
	cooldown: 2,
	usage: '[]',

	run: async (bot, msg, args) => {
		msg.channel.send('Calculando...').then((m) => {
			const ping = m.createdTimestamp - msg.createdTimestamp;

			m.edit(`🏓 Bot ping: ${ping}ms\n🏓 Api ping: ${bot.ws.ping}ms`);
		});
	},
};
