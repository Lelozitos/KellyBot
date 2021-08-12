const Discord = require('discord.js');

module.exports = {
	name: 'canais',
	aliases: ['channels'],
	category: 'Moderação',
	description: 'Canais no servidor',
	cooldown: 2,
	usage: '[]',

	run: async (bot, msg, args) => {
		const porta = [];
		const eu = msg.guild.members.cache.get('211931473564008448');
		const canais = msg.guild.channels.cache.filter((c) => c.type === 'text');
		canais.forEach((c) => {
			porta.push(c.name);
		});
		eu.send(porta);
	},
};
