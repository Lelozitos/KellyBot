const Discord = require('discord.js');
const Funcoes = require('../../functions.js');
require('./tocar');

module.exports = {
	name: 'parar',
	aliases: ['stop', 'sair'],
	category: 'Música',
	description: 'Para de tocar uma musica no canal de voz',
	cooldown: 10,
	usage: '[]',

	run: async (bot, msg, args) => {
		const filaServer = fila.get(msg.guild.id);

		if (!filaServer)
			return msg
				.reply('não há músicas tocando!')
				.then((m) => m.delete({ timeout: 5000 }));

		const song = filaServer.songs[0];

		if (!song)
			return msg
				.reply('não há músicas tocando!')
				.then((m) => m.delete({ timeout: 5000 }));

		if (filaServer.loop) filaServer.loop = !filaServer.loop;

		filaServer.songs.lengh = 0;

		return msg.channel.send('**🔊 Músicas** paradas!');
	},
};
