const Discord = require('discord.js');
const Funcoes = require('../../functions.js');
require('./tocar');

module.exports = {
	name: 'fila',
	aliases: ['queue'],
	category: 'Música',
	description: 'Próximas músicas que tocarão',
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

		const embedFila = new Discord.MessageEmbed()
			.setTitle(`**🔊 Fila**`)
			.setDescription('`' + song.title + '` - ' + song.duration)
			.setColor('0xAAFF00')
			.setThumbnail(song.thumbnail)
			.setFooter(msg.author.username, msg.author.displayAvatarURL());

		filaServer.songs.forEach((s) => {
			embedFila.addField(`${s.title} - ${s.duration}`, s.player.username);
		});
		embedFila.fields.shift();

		msg.channel.send(embedFila);
	},
};
