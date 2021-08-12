const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

module.exports = {
	name: 'blackjack',
	aliases: ['bj', '21'],
	category: 'Jogos',
	description: 'É blackjack... só isso mesmo',
	cooldown: 5,
	usage: '[]',

	run: async function (bot, msg, args) {
		//Cria o Deck
		let numeros = [
			'A',
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'10',
			'J',
			'Q',
			'K',
		];
		let naipes = [':clubs:', ':hearts:', ':spades:', ':diamonds:'];

		let deck = [];
		for (var i = 0; i < numeros.length; i++) {
			for (var x = 0; x < naipes.length; x++) {
				var peso = parseInt(numeros[i]);
				if (numeros[i] == 'J' || numeros[i] == 'Q' || numeros[i] == 'K')
					peso = 10;
				else if (numeros[i] == 'A') peso = 11;
				var card = { Numero: numeros[i], Naipe: naipes[x], Peso: peso };
				deck.push(card);
			}
		}
		//console.log(deck);

		//Embaralha o Deck
		for (var i = 0; i < 1000; i++) {
			var location1 = Math.floor(Math.random() * deck.length);
			var location2 = Math.floor(Math.random() * deck.length);
			var tmp = deck[location1];

			deck[location1] = deck[location2];
			deck[location2] = tmp;
		}
		//console.log(deck);

		//Cria os jogadores dependendo das menções
		var dealer = {
			ID: '🤖',
			Nome: 'Mesa',
			Pontos: 0,
			Mão: [],
		};

		let jogadores = [dealer];

		if (msg.mentions.members.array().length < 1) {
			var eu = {
				ID: '🙍‍♂️',
				Nome: msg.author.username,
				Pontos: 0,
				Mão: [],
			};
			jogadores.push(eu);
		} else {
			// msg.mentions.members.array().forEach((m) => {
			// 	var jogador = {
			// 		ID: '🙍‍♂️',
			// 		Nome: m.user.username,
			// 		Pontos: 0,
			// 		Mão: [],
			// 	};
			// 	jogadores.push(jogador);
			// });
		}

		//Entrega as cartas para os jogadores
		for (var i = 0; i < 2; i++) {
			for (var j = 0; j < jogadores.length; j++) {
				var carta = deck.pop();
				jogadores[j].Mão.push(carta);
			}
		}

		var embedBj = new Discord.MessageEmbed()
			.setColor('#7B7D7D')
			.setTitle('**🃏 BlackJack**')
			.setDescription('Reaja com os emojis para jogar!')
			.setFooter(msg.author.username, msg.author.displayAvatarURL());

		jogadores.forEach((j) => {
			var mao = '';

			if (j.ID == '🤖') {
				j.Pontos = j.Mão[0].Peso;
				mao = `${j.Mão[0].Numero}${j.Mão[0].Naipe} ?`;
			} else {
				j.Mão.forEach((c) => {
					j.Pontos += c.Peso;
					mao = `${mao} ${c.Numero}${c.Naipe}`;
				});
			}

			embedBj.addField(`${j.ID} - ${j.Nome}`, `${mao} - **${j.Pontos}**`);
		});

		// se passar de 21, detectar se há um Ás na mão com Mão.find(c => c.Peso === 11);
		// se sim, retirar 10 do valor do deck.

		const m = await msg.channel.send(embedBj);
		let reagido = await Funcoes.detectarReacao(m, msg.author, 45, ['👆', '✋']);

		if (reagido === undefined)
			return m
				.edit(
					embedBj.setDescription(
						'O tempo expirou! Dê o comando de novo para jogar!'
					)
				)
				.then(m.reactions.removeAll());

		while (reagido === '👆') {
			var carta = deck.pop();
			var mao = '';

			jogadores[1].Mão.push(carta);
			jogadores[1].Mão.forEach((c) => {
				mao = `${mao} ${c.Numero}${c.Naipe}`;
			});
			jogadores[1].Pontos += carta.Peso;

			verificar(jogadores, 1);

			embedBj.fields[1].value = `${mao} - **${jogadores[1].Pontos}**`;
			m.edit(embedBj).then(m.reactions.removeAll());

			if (verificar(jogadores, 1)) {
				m.edit(
					embedBj
						.setColor('#FF0000')
						.setDescription('**Você perdeu!**')
						.addField('\u200b', 'Deseja jogar de novo?')
				).then(m.reactions.removeAll());

				reagido = await Funcoes.detectarReacao(m, msg.author, 20, ['✅']);

				embedBj.fields.pop();

				if (reagido === undefined)
					return m.reactions.removeAll().then(m.edit(embedBj));
				if (reagido === '✅') {
					m.reactions.removeAll();
					this.run(bot, msg, args);

					m.edit(embedBj);
				}
				return;
			}

			reagido = await Funcoes.detectarReacao(m, msg.author, 45, ['👆', '✋']);

			if (reagido === undefined)
				return m
					.edit(
						embedBj.setDescription(
							'O tempo expirou! Dê o comando de novo para jogar!'
						)
					)
					.then(m.reactions.removeAll());
		}
		if (reagido === '✋') {
			m.reactions.removeAll();

			jogadores[0].Pontos = 0;
			mao = '';

			jogadores[0].Mão.forEach((c) => {
				mao = `${mao} ${c.Numero}${c.Naipe}`;
				jogadores[0].Pontos += c.Peso;
			});

			embedBj.fields[0].value = `${mao} - **${jogadores[0].Pontos}**`;
			m.edit(embedBj).then(m.reactions.removeAll());

			while (
				jogadores[0].Pontos <= jogadores[1].Pontos &&
				jogadores[0].Pontos <= 16
			) {
				var carta = deck.pop();
				var mao = '';

				jogadores[0].Mão.push(carta);
				jogadores[0].Mão.forEach((c) => {
					mao = `${mao} ${c.Numero}${c.Naipe}`;
				});
				jogadores[0].Pontos += carta.Peso;

				verificar(jogadores, 0);

				embedBj.fields[0].value = `${mao} - **${jogadores[0].Pontos}**`;
				m.edit(embedBj).then(m.reactions.removeAll());
			}
			if (
				jogadores[0].Pontos > jogadores[1].Pontos &&
				jogadores[0].Pontos <= 21
			)
				embedBj.setColor('#FF0000').setDescription('**Você perdeu!**');
			else if (jogadores[0].Pontos == jogadores[1].Pontos)
				embedBj.setColor('#FFFF00').setDescription('**Empate**');
			else embedBj.setColor('#00FF00').setDescription('**Você ganhou!**');

			m.edit(embedBj.addField('\u200b', 'Deseja jogar de novo?')).then(
				m.reactions.removeAll()
			);

			reagido = await Funcoes.detectarReacao(m, msg.author, 20, ['✅']);

			embedBj.fields.pop();

			if (reagido === undefined)
				return m.reactions.removeAll().then(m.edit(embedBj));
			if (reagido === '✅') {
				m.reactions.removeAll();
				this.run(bot, msg, args);

				m.edit(embedBj);
			}
		}
	},
};
function verificar(jogadores, j) {
	if (jogadores[j].Pontos > 21) {
		if (jogadores[j].Mão.find((c) => c.Peso == 11)) {
			jogadores[j].Mão.find((c) => c.Peso == 11).Peso = 1;
			jogadores[j].Pontos -= 10;
			return false;
		} else return true;
	}
}
