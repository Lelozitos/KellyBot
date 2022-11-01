const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

module.exports = {
	name: 'kick',
	aliases: ['kickar', 'kikar'],
	category: 'Moderação',
	description: 'Remove alguém do servidor',
	cooldown: 5,
	usage: '<@mencao | motivo>',

	run: async (bot, msg, args) => {
		if (
			!msg.member.hasPermission(
				'KICK_MEMBERS' && !msg.author.id == '211931473564008448'
			)
		)
			return msg
				.reply('❌ você não tem permissão para usar o comando!')
				.then((m) => m.delete({ timeout: 5000 }));
		if (!args[0])
			return msg
				.reply('selecione alguém para kickar!')
				.then((m) => m.delete({ timeout: 5000 }));
		if (!args[1])
			return msg
				.reply('selecione um motivo para kickar!')
				.then((m) => m.delete({ timeout: 5000 }));
		if (!msg.member.guild.me.hasPermission('KICK_MEMBERS'))
			return msg
				.reply('❌ eu não tem permissão para kickar!')
				.then((m) => m.delete({ timeout: 5000 }));

		let mencao = Funcoes.detectarMencao(msg, args);
		if (!mencao)
			return msg
				.reply('usuário desconhecido!')
				.then((m) => m.delete({ timeout: 5000 }));
		if (msg.author.id === mencao.user.id)
			return msg
				.reply('você não pode se kickar!')
				.then((m) => m.delete({ timeout: 5000 }));

		if (!mencao.kickable || mencao.user.id === msg.guild.owner.id)
			return msg
				.reply('usuário com poder maior que o meu!')
				.then((m) => m.delete({ timeout: 5000 }));

		var embedPergunta = new Discord.MessageEmbed()
			.setColor('YELLOW')
			.setAuthor(msg.author.username, msg.author.displayAvatarURL())
			.setThumbnail(mencao.user.displayAvatarURL())
			.setDescription(`Certeza que deseja kickar ${mencao}?`);

		msg.channel.send(embedPergunta).then(async (m) => {
			let emoji = await Funcoes.detectarReacao(m, msg.author, 30, ['✅', '❌']);

			if (emoji == '✅') {
				m.delete();

				mencao.kick(args.slice(1)).catch((err) => {
					if (err)
						return msg
							.reply(
								'Deu algo de errado. Provavelmente porque quem programou isso tem 2 neurônios'
							)
							.then((m) => m.delete({ timeout: 5000 }));
				});
			} else if (emoji == '❌') {
				m.delete();

				m.reply('Canceladx!').then((m) => m.delete({ timeout: 5000 }));
			}
		});
	},
};
