const Discord = require('discord.js');
const Funcoes = require('../../functions.js');
require('./tocar');

module.exports = {
	name: 'tocando',
	aliases: ['np', 'playing', 'nowplaying'],
	category: 'Música',
	description: 'Mostra a música que está tocando',
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

		const embedTocando = new Discord.MessageEmbed()
			.setTitle(`**🔊 Música**`)
			.setURL(song.url)
			.setDescription('`' + song.title + '` - ' + song.duration)
			.setColor('0xAAFF00')
			.setThumbnail(song.thumbnail)
			.setFooter(song.player.username, song.player.displayAvatarURL());

		msg.channel.send(embedTocando);
	},
};
