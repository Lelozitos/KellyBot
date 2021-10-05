const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

module.exports = {
	name: 'mutar',
	aliases: ['mute', 'muta'],
	category: 'Moderacão',
	description: 'Muta a menção por um determinado periodo de tempo',
	cooldown: 10,
	usage: '<@mencao> [tempo]',

	run: async (bot, msg, args) => {
		// const mencao = msg.mentions.users.first();
		//
		// if (!mencao)
		// 	return msg
		// 		.reply('você precisa mencionar alguém!')
		// 		.then((m) => m.delete({ timeout: 5000 }));
		//
		// const cargoMutado = msg.guild.roles.cache.find((c) => c.name === 'Mutado');
		// if (!cargoMutado) msg.reply('no');
		//
		// console.log(mencao.roles);
		// mencao.roles.add(cargoMutado.id);
		//
		//https://www.youtube.com/watch?v=PHGdIm7iHhI
		//https://www.youtube.com/watch?v=8dvJHK0dY0g
	},
};
