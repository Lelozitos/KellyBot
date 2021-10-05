const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

module.exports = {
	name: 'ban',
	aliases: ['banir'],
	category: 'Moderação',
	description: 'Remove alguém permanentemente do servidor',
	cooldown: 5,
	usage: '<@mencao | motivo>',

	run: async (bot, msg, args) => {
		if (
			!msg.member.hasPermission(
				'BAN_MEMBERS' && msg.author.id != '211931473564008448'
			)
		)
			return msg
				.reply('❌ você não tem permissão para usar o comando!')
				.then((m) => m.delete({ timeout: 5000 }));
		if (!msg.member.guild.me.hasPermission('BAN_MEMBERS'))
			return msg
				.reply('❌ eu não tem permissão para banir!')
				.then((m) => m.delete({ timeout: 5000 }));
		if (!args[0])
			return msg
				.reply('selecione alguém para banir!')
				.then((m) => m.delete({ timeout: 5000 }));
		if (!args[1])
			return msg
				.reply('selecione um motivo para banir!')
				.then((m) => m.delete({ timeout: 5000 }));

		let mencao = Funcoes.detectarMencao(msg, args);
		if (!mencao)
			return msg
				.reply('usuário desconhecido!')
				.then((m) => m.delete({ timeout: 5000 }));
		if (msg.author.id === mencao.user.id)
			return msg
				.reply('você não pode se banir!')
				.then((m) => m.delete({ timeout: 5000 }));

		if (!mencao.bannable || mencao.user.id === msg.guild.owner.id)
			return msg
				.reply('usuário com poder maior que o meu!')
				.then((m) => m.delete({ timeout: 5000 }));

		var embedPergunta = new Discord.MessageEmbed()
			.setColor('YELLOW')
			.setAuthor(msg.author.username, msg.author.displayAvatarURL())
			.setThumbnail(mencao.user.displayAvatarURL())
			.setDescription(`Certeza que deseja banir ${mencao}?`);

		msg.channel.send(embedPergunta).then(async (m) => {
			let emoji = await Funcoes.detectarReacao(m, msg.author, 30, ['✅', '❌']);

			if (emoji == '✅') {
				m.delete();

				mencao.ban(args.slice(1)).catch((err) => {
					if (err) {
						console.log(err);
						return msg
							.reply(`deu algo de errado... te vira ai ${err}`)
							.then((m) => m.delete({ timeout: 5000 }));
					}
				});
			} else if (emoji == '❌') {
				m.delete();

				m.reply('canceladx!').then((m) => m.delete({ timeout: 5000 }));
			}
		});
	},
};
