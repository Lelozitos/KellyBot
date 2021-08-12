const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

module.exports = {
	name: 'loop',
	aliases: ['l', 'repetir'],
	category: 'Música',
	description: 'Coloca a fila em um loop',
	cooldown: 10,
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
				.reply('não há músicas tocando!')
				.then((m) => m.delete({ timeout: 5000 }));

		filaServer.loop = !filaServer.loop;

		let mensagem;
		filaServer.loop
			? (mensagem = '🔁 Loop Iniciado!')
			: (mensagem = '🔁 Loop Quebrado!');

		msg.channel.send(mensagem);
	},
};
