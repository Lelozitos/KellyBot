const Discord = require('discord.js');
require('./tocar');

module.exports = {
	name: 'volume',
	aliases: ['vol'],
	category: 'Música',
	description: 'Muda o volume do bot de música',
	cooldown: 5,
	usage: '[]',

	run: async (bot, msg, args) => {
		filaServer = fila.get(msg.guild.id);

		if (!filaServer)
			return msg
				.reply('eu não estou em um canal!')
				.then((m) => m.delete({ timeout: 5000 }));

		if (!args[0] || isNaN(args[0]))
			return msg.channel.send(`🔊 Volume é de ${filaServer.volume} (0 - 3)`);

		if (args[0] > 3)
			return msg
				.reply('muito alto! (Máximo de 3)')
				.then((m) => m.delete({ timeout: 5000 }));

		if (args[0] < 0)
			return msg
				.reply('não aceito números negativos!')
				.then((m) => m.delete({ timeout: 5000 }));

		filaServer.volume = args[0];
		filaServer.connection.dispatcher.setVolumeLogarithmic(args[0]);

		msg.channel.send(`🔊 Volume foi definido para ${filaServer.volume}!`);
	},
};
