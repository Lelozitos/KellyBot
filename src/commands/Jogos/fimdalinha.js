const Discord = require('discord.js');

module.exports = {
	name: 'fimdalinha',
	aliases: ['fdl', '10to1', '100to1'],
	category: 'Jogos',
	description: 'A pessoa que chegar a 1 perde',
	cooldown: 2,
	usage: '[]',

	run: async (bot, msg, args) => {
		let inicio = 100;

		if (args[0]) inicio = parseInt(args[0]);

		let embed100 = new Discord.MessageEmbed()
			.setColor('#7B7D7D')
			.setTitle('**↩ Fim da linha**')
			.setDescription('Reaja com o emoji para jogar!')
			.setFooter(msg.author.username, msg.author.displayAvatarURL());

		const m = await msg.channel.send(embed100);
		let reacoes = await detectarReacaoTodos(m, 15, ['▶']);

		//console.log(reacoes.users.cache.array()[1].id);
		if (reacoes) var reagido = reacoes.emoji.name;

		if (reagido === undefined)
			return m
				.edit(
					embed100.setDescription(
						'O tempo expirou! Dê o comando de novo para jogar!'
					)
				)
				.then(m.reactions.removeAll());

		let numeros = [];
		let atual = inicio;

		while (reagido == '▶') {
			let menos = Math.round(Math.random() * (atual - 1));

			atual -= menos;
			numeros.push(menos);

			let membro = await msg.guild.member(reacoes.users.cache.array()[1].id);

			let cor;
			if (atual <= inicio * 0.33) cor = '0xFF0000';
			else if (atual > inicio * 0.33 && atual < inicio * 0.66) cor = '0xFCFF00';
			else cor = '0x00FF23';

			embed100
				.setTitle(`**↩ Fim da linha** (${inicio})`)
				.setDescription(`**${atual}**  (-${menos})`)
				.setFooter(membro.user.username, membro.user.displayAvatarURL())
				.setColor(cor);
			m.edit(embed100).then(m.reactions.removeAll());

			if (atual == 1) {
				embed100
					.addField('**Acabou!** O perdedor é:', `${membro.user.username}`)
					.setColor('#7B7D7D');
				m.edit(embed100);
				return;
			}

			reacoes = await detectarReacaoTodos(m, 30, ['▶']);
			if (reacoes === undefined)
				return m
					.edit(
						embed100.setDescription(
							'O tempo expirou! Dê o comando de novo para jogar!'
						)
					)
					.then(m.reactions.removeAll());
			reagido = reacoes.emoji.name;
		}
	},
};

async function detectarReacaoTodos(msg, time, validReactions) {
	time *= 1000;

	validReactions.forEach((r) => {
		msg.react(r);
	});

	const filter = (reaction, user) =>
		validReactions.includes(reaction.emoji.name) && !user.bot;

	return msg
		.awaitReactions(filter, { max: 1, time: time })
		.then((collected) => {
			if (collected.first() === undefined) return;
			let reacoes = collected.first();
			return reacoes;
		});
}
