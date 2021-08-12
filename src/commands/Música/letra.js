const Discord = require('discord.js');
const Genius = require('genius-lyrics');
const GeniusClient = new Genius.Client('');
require('./tocar');

module.exports = {
	name: 'letra',
	aliases: ['lyrics', 'ly'],
	category: 'Música',
	description: 'Mostra a letra da música',
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

		let letra;
		try {
			letra = await acharLetra(song.title);
		} catch (err) {
			letra = 'Não foi possível encontrar a letra!';
		}

		const embedTocando = new Discord.MessageEmbed()
			.setTitle(`**🎼 Letra**`)
			.setURL(song.url)
			.setDescription(`${letra}`)
			.addField(
				`${song.title} - ${song.duration}`,
				'\nLetras providas por `Genius!`'
			)
			.setColor('0x4279A0')
			.setThumbnail(song.thumbnail)
			.setFooter(song.player.username, song.player.displayAvatarURL());

		msg.channel.send(embedTocando);
	},
};

async function acharLetra(titulo) {
	let letra;

	try {
		searches = await GeniusClient.songs.search(titulo);
	} catch (err) {
		letra = 'Não foi possível encontrar a letra!';
		return letra;
	}

	const firstSong = searches[0];
	letra = await firstSong.lyrics();

	return letra;
}
