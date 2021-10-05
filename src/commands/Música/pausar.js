const Discord = require('discord.js');
const Funcoes = require('../../functions.js');
require('./tocar');

module.exports = {
	name: 'pausar',
	aliases: [
		'pausa',
		'pause',
		'resumir',
		'resume',
		'resuma',
		'retomar',
		'retome',
		'retoma',
	],
	category: 'Música',
	description: 'Pausa a música que está tocando',
	cooldown: 2,
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

		const embedPause = new Discord.MessageEmbed()
			.setColor('0x794000')
			.setFooter(msg.author.username, msg.author.displayAvatarURL());

		if (filaServer.playing) {
			filaServer.playing = false;
			filaServer.connection.dispatcher.pause();

			embedPause.setTitle(`**⏸ Pausar**`).setDescription('Música pausada!');

			msg.channel.send(embedPause);
		} else {
			filaServer.playing = true;
			filaServer.connection.dispatcher.resume();

			embedPause.setTitle(`**▶ Resumir**`).setDescription('Música retomada!');

			msg.channel.send(embedPause);
		}
	},
};
