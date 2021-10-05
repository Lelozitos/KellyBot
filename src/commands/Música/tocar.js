const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

fila = new Map();

module.exports = {
	name: 'tocar',
	aliases: ['t', 'p', 'play'],
	category: 'Música',
	description: 'Toca uma música do YouTube',
	cooldown: 5,
	usage: '<url || título>',

	run: async (bot, msg, args) => {
		bot.setMaxListeners(10);
		//Entrar no canal
		const canalVoz = msg.member.voice.channel;
		if (!canalVoz)
			return msg
				.reply(
					'você precisa estar em um canal de voz para que eu possa conectar!'
				)
				.then((m) => m.delete({ timeout: 3000 }));

		if (!msg.guild.me.permissionsIn(canalVoz.id).has('CONNECT'))
			return msg
				.reply('não tenho permissões para conectar ao canal!')
				.then((m) => m.delete({ timeout: 3000 }));
		if (!msg.guild.me.permissionsIn(canalVoz.id).has('SPEAK'))
			return msg
				.reply('não tenho permissões para falar no canal!')
				.then((m) => m.delete({ timeout: 3000 }));

		//Achar o video
		if (!args[0])
			return msg
				.reply('você precisa colocar um vídeo para eu tocar!')
				.then((m) => m.delete({ timeout: 3000 }));

		let song = {};

		//Por link
		if (ytdl.validateURL(args[0])) {
			const songInfo = await ytdl.getInfo(args[0]);
			song = {
				title: songInfo.videoDetails.title,
				url: songInfo.videoDetails.video_url,
				duration: convertHMS(songInfo.videoDetails.lengthSeconds),
				thumbnail:
					songInfo.videoDetails.thumbnails[
						songInfo.videoDetails.thumbnails.length - 1
					].url,
				player: msg.author,
			};

			function convertHMS(value) {
				const sec = parseInt(value, 10);
				let hours = Math.floor(sec / 3600);
				let minutes = Math.floor((sec - hours * 3600) / 60);
				let seconds = sec - hours * 3600 - minutes * 60;

				if (hours < 10) {
					hours = '0' + hours;
				}
				if (minutes < 10) {
					minutes = '0' + minutes;
				}
				if (seconds < 10) {
					seconds = '0' + seconds;
				}
				return hours + ':' + minutes + ':' + seconds;
			}

			//Por pesquisa
		} else {
			const acharVideo = async (query) => {
				const resultados = await ytSearch(query);

				return resultados.videos.length > 1 ? resultados.videos[0] : null;
			};

			const video = await acharVideo(args.join(' '));

			if (video) {
				song = {
					title: video.title,
					url: video.url,
					duration: video.timestamp,
					thumbnail: video.thumbnail,
					player: msg.author,
				};
			} else {
				return msg
					.reply('vídeo não encontrado!')
					.then((m) => m.delete({ timeout: 3000 }));
			}
		}

		//Cria a fila
		let filaServer = fila.get(msg.guild.id);

		if (!filaServer) {
			const filaConstructor = {
				voiceChannel: canalVoz,
				textChannel: msg.channel,
				connection: null,
				volume: 1,
				playing: true,
				loop: false,
				songs: [],
			};

			fila.set(msg.guild.id, filaConstructor);
			filaConstructor.songs.push(song);

			try {
				const conectar = await canalVoz.join();
				filaConstructor.connection = conectar;
				videoPlayer(msg.guild, filaConstructor.songs[0]);
			} catch (err) {
				fila.delete(msg.guild.id);
				msg.reply('houve algum erro ao conectar!');
				throw err;
			}
		} else {
			filaServer.songs.push(song);
			return msg.channel.send(
				'**🔊 Música** `' + song.title + '` adicionada à fila!'
			);
		}

		filaServer = fila.get(msg.guild.id);
	},
};

//Tocar a musica
const videoPlayer = async (guild, song) => {
	const filaSongs = fila.get(guild.id);

	if (!song) {
		fila.delete(guild.id);
		return;
	}

	const stream = ytdl(song.url, { filter: 'audioonly' });
	filaSongs.connection
		.play(stream, { seek: 0, volume: filaSongs.volume })
		.on('finish', () => {
			if (filaSongs.loop) {
				filaSongs.songs.push(filaSongs.songs[0]);
			}
			filaSongs.songs.shift();
			videoPlayer(guild, filaSongs.songs[0]);
		});

	const embedTocando = new Discord.MessageEmbed()
		.setTitle(`**🔊 Música**`)
		.setURL(song.url)
		.setDescription('`' + song.title + '` - ' + song.duration)
		.setColor('0xAAFF00')
		.setThumbnail(song.thumbnail)
		.setFooter(song.player.username, song.player.displayAvatarURL());

	await filaSongs.textChannel.send(embedTocando);
};
