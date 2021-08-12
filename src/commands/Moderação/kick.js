const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

module.exports = {
	name: 'kick',
	aliases: ['kikar', 'kickar'],
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
				.then((m) => m.delete({ timeout: 3000 }));
		if (!args[0])
			return msg
				.reply('selecione alguém para kikar!')
				.then((m) => m.delete({ timeout: 3000 }));
		if (!args[1])
			return msg
				.reply('selecione um motivo para kikar!')
				.then((m) => m.delete({ timeout: 3000 }));
		if (!msg.member.guild.me.hasPermission('KICK_MEMBERS'))
			return msg
				.reply('❌ eu não tem permissão para kikar!')
				.then((m) => m.delete({ timeout: 3000 }));

		let mencao = Funcoes.detectarMencao(msg, args);
		if (!mencao)
			return msg
				.reply('usuário desconhecido!')
				.then((m) => m.delete({ timeout: 3000 }));
		if (msg.author.id === mencao.user.id)
			return msg
				.reply('você não pode se kikar!')
				.then((m) => m.delete({ timeout: 3000 }));

		if (!mencao.kickable || mencao.user.id === msg.guild.owner.id)
			return msg
				.reply('usuário com poder maior que o meu!')
				.then((m) => m.delete({ timeout: 3000 }));

		var embedPergunta = new Discord.MessageEmbed()
			.setColor('YELLOW')
			.setAuthor(msg.author.username, msg.author.displayAvatarURL())
			.setThumbnail(mencao.user.displayAvatarURL())
			.setDescription(`Certeza que deseja kikar ${mencao}?`);

		msg.channel.send(embedPergunta).then(async (m) => {
			let emoji = await Funcoes.detectarReacao(m, msg.author, 30, ['✅', '❌']);

			if (emoji == '✅') {
				m.delete();

				mencao.kick(args.slice(1)).catch((err) => {
					if (err)
						return msg
							.reply('Deu algo de errado... te vira ai')
							.then((m) => m.delete({ timeout: 3000 }));
				});
			} else if (emoji == '❌') {
				m.delete();

				m.reply('Canceladx!').then((m) => m.delete({ timeout: 3000 }));
			}
		});
	},
};
