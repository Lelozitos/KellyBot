const Discord = require('discord.js');
const Funcoes = require('../../functions.js');
require('./tocar');

module.exports = {
	name: 'pular',
	aliases: ['skip', 's', 'fs'],
	category: 'Música',
	description: 'Pula a música atual',
	cooldown: 5,
	usage: '[]',

	run: async (bot, msg, args) => {
		filaServer = fila.get(msg.guild.id);

		if (!filaServer)
			return msg
				.reply('não há músicas tocando!')
				.then((m) => m.delete({ timeout: 5000 }));

		const song = filaServer.songs[0];

		if (!song)
			return msg
				.reply('não há músicas na fila!')
				.then((m) => m.delete({ timeout: 5000 }));

		filaServer.connection.dispatcher.end();

		msg.channel.send('**🔊 Música** `' + song.title + '` pulada!');
	},
};
