const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
	name: 'ship',
	aliases: ['amor', 'love'],
	category: 'Jogos',
	description: 'Dá uma porcentagem aleatória ai... pensa muita coisa não',
	cooldown: 3,
	usage: '<@mencao | @mencao>',

	run: async (bot, msg, args) => {
		let mencoes = msg.mentions.members.array();
		let mencao1;
		let mencao2;
		let humor;
		let cor;

		if (mencoes.length < 1)
			return msg
				.reply('mencione 2 pessoas para funcionar!')
				.then((m) => m.delete({ timeout: 5000 }));

		if (mencoes.length === 1) {
			mencao1 = msg.member;
			mencao2 = mencoes[0];
		}

		if (mencoes.length === 2) {
			mencao1 = mencoes[0];
			mencao2 = mencoes[1];
		}

		if (mencoes.length > 2)
			return msg
				.reply('muitas pessoas para calcular!')
				.then((m) => m.delete({ timeout: 5000 }));

		if (mencao1.user.id === mencao2.user.id)
			return msg
				.reply('você não pode shipar a mesma pessoa!')
				.then((m) => m.delete({ timeout: 5000 }));

		// let sampleNumber =
		// 	(mencao1.user.id / 1000000000) * (mencao2.user.id / 1000000000);
		// var taxa = parseInt(sampleNumber.toString().slice(-2));
		var taxa = parseInt(Math.random() * 100);

		let imagemTaxa = '■'.repeat(taxa / 10) + ' .'.repeat(10 - taxa / 10);

		if (taxa < 33) {
			humor = './images/partido.png';
			cor = '#ff9999';
		} else if (66 > taxa && taxa >= 33) {
			humor = './images/numsei.png';
			cor = '#531111';
		} else {
			humor = './images/coracao.png';
			cor = '#ff0000';
		}

		const canvas = Canvas.createCanvas(384, 128);
		const ctx = canvas.getContext('2d');

		const avatar1 = await Canvas.loadImage(
			mencao1.user.displayAvatarURL({ format: 'jpg' })
		);
		const avatar2 = await Canvas.loadImage(
			mencao2.user.displayAvatarURL({ format: 'jpg' })
		);
		humor = await Canvas.loadImage(humor);

		ctx.drawImage(avatar1, 0, 0, 128, canvas.height);
		ctx.drawImage(humor, 128, 0, 128, canvas.height);
		ctx.drawImage(avatar2, 256, 0, 128, canvas.height);

		const imagem = new Discord.MessageAttachment(canvas.toBuffer(), 'ship.png');

		let embedShip = new Discord.MessageEmbed()
			.setTitle(`💕 ${taxa}% [${imagemTaxa}]`)
			.setDescription(
				'```' +
					mencao1.user.username +
					'```\n```' +
					mencao2.user.username +
					'```'
			)
			.setColor(cor)
			.attachFiles(imagem)
			.setImage('attachment://ship.png')
			.setFooter(msg.author.username, msg.author.displayAvatarURL())
			.setTimestamp();

		msg.channel.send(embedShip);
	},
};
