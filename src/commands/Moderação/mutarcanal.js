const Discord = require('discord.js');

module.exports = {
	name: 'mutarcanal',
	aliases: ['mc', 'lockdown', 'ld'],
	category: 'Moderação',
	description: 'Muta o canal por um tempo determinado, ou como um interruptor',
	cooldown: 10,
	usage: '[tempo]',

	run: async (bot, msg, args) => {
		// mutar o canal para todos
	},
};
