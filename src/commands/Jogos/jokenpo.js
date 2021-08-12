const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

const opcoes = ['🗻', '📃', '✂'];

module.exports = {
	name: 'jokenpo',
	aliases: ['jkp', 'ppt', 'rps'],
	category: 'Jogos',
	description: 'Jokenpô... só isso mesmo. Reaja com os emojis para jogar.',
	cooldown: 2,
	usage: '[]',

	run: async function (bot, msg, args) {
		var embedRps = new Discord.MessageEmbed()
			.setTitle('✂ Jokenpô')
			.setColor('#7B7D7D')
			.setFooter(msg.author.username, msg.author.displayAvatarURL())
			.setDescription('Reaja com os emojis para jogar!');

		const m = await msg.channel.send(embedRps);
		let reagido = await Funcoes.detectarReacao(m, msg.author, 20, opcoes);
		const escolhaBot = opcoes[Math.floor(Math.random() * opcoes.length)];

		if (reagido === undefined)
			return m
				.edit(
					embedRps.setDescription(
						'O tempo expirou! Dê o comando de novo para jogar!'
					)
				)
				.then(m.reactions.removeAll());

		const resultado = await resultados(reagido, escolhaBot);
		console.log(resultado);

		switch (resultado) {
			case 'Você ganhou!':
				embedRps.setColor('#00FF00');
				break;
			case 'Empate!':
				embedRps.setColor('#FFFF00');
				break;
			case 'Você perdeu!':
				embedRps.setColor('#FF0000');
				break;
		}

		embedRps
			.setDescription('')
			.addField(resultado, `${reagido} x ${escolhaBot}`)
			.addField('\u200b', 'Deseja jogar de novo?');
		m.edit(embedRps).then(m.reactions.removeAll());

		reagido = await Funcoes.detectarReacao(m, msg.author, 20, ['✅']);

		embedRps.fields.pop();

		if (reagido === undefined)
			return m.reactions.removeAll().then(m.edit(embedRps));
		if (reagido === '✅') {
			m.reactions.removeAll();
			this.run(bot, msg, args);
			// bot.commands.get('jokenpo').run(bot, msg, args);
			m.edit(embedRps);
		}
	},
};

function resultados(me, clientChosen) {
	if (
		(me === '🗻' && clientChosen === '✂') ||
		(me === '📃' && clientChosen === '🗻') ||
		(me === '✂' && clientChosen === '📃')
	) {
		return 'Você ganhou!';
	} else if (me === clientChosen) {
		return 'Empate!';
	} else {
		return 'Você perdeu!';
	}
}
