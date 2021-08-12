const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

module.exports = {
	name: 'denunciar',
	aliases: ['report', 'denuncia'],
	category: 'Moderação',
	description: 'Denuncia alguém no servidor',
	cooldown: 20,
	usage: '<@mencao | motivo>',

	run: async (bot, msg, args) => {
		let mencao = Funcoes.detectarMencao(msg, args);

		const canalDenuncia = msg.guild.channels.cache.find(
			(canalDenuncia) => canalDenuncia.name == 'denuncias'
		);
		if (!canalDenuncia)
			return msg
				.reply('não há um canal de `denuncias`!')
				.then((m) => m.delete({ timeout: 3000 }));

		if (!args[0] || mencao.user.id === msg.member.user.id)
			return msg
				.reply('usuário inválido!')
				.then((m) => m.delete({ timeout: 3000 }));
		if (mencao.user.bot)
			return msg
				.reply('você não pode denunciar essa pessoa!')
				.then((m) => m.delete({ timeout: 3000 }));
		if (!mencao)
			return msg
				.reply('não foi possivel encontrar essa pessoa')
				.then((m) => m.delete({ timeout: 3000 }));
		if (!args[1])
			return msg
				.reply('motivo inválido!')
				.then((m) => m.delete({ timeout: 3000 }));

		let apelidoM = mencao.nickname || mencao.user.username;
		let apelidoD = msg.member.nickname || msg.member.username;
		var embedDenuncia = new Discord.MessageEmbed()
			.setColor('RED')
			.setThumbnail(mencao.user.displayAvatarURL())
			.setTitle(' • Usuário Reportado')
			.setDescription(
				`- **Nome:** ${mencao.user}\n- **TAG:** ${mencao.user.tag}\n- **ID:** ${mencao.user.id}`
			)
			.addFields(
				{
					name: 'Reportado por:',
					value: `**- Nome:** ${msg.author}\n- **TAG:** ${msg.author.tag}\n- **ID:** ${msg.member.user.id}\n- **Canal:** ${msg.channel}`,
				},
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Motivo:', value: args.slice(1) }
			)
			.setTimestamp();

		canalDenuncia.send(embedDenuncia);
		msg.channel
			.send('Denúncia feita com sucesso!')
			.then((m) => m.delete({ timeout: 3000 }));
	},
};
