const Discord = require('discord.js');
const QRCode = require('qrcode-generator');
const Canvas = require('canvas');

module.exports = {
	name: 'qrcode',
	aliases: ['qr'],
	category: 'Utilidades',
	description: 'Gera um qr code',
	cooldown: 5,
	usage: '[]',

	run: async (bot, msg, args) => {
		const dados = args.join(' ');
		if (!dados)
			return msg
				.reply('escreva a mensagem para converter para QRcode!')
				.then((m) => m.delete({ timeout: 3000 }));

		let qr = QRCode(0, 'L');
		qr.addData(dados);
		qr.make();

		const canvas = Canvas.createCanvas(256, 256);
		const ctx = canvas.getContext('2d');

		const qrimagem = await Canvas.loadImage(qr.createDataURL(8, 8));

		ctx.drawImage(qrimagem, 0, 0, canvas.width, canvas.height);
		const imagem = new Discord.MessageAttachment(
			canvas.toBuffer(),
			'qrcode.png'
		);

		let embedQr = new Discord.MessageEmbed()
			.setTitle('📲 **QR Code**')
			.setDescription('```' + dados + '```')
			.attachFiles(imagem)
			.setImage('attachment://qrcode.png')
			.setFooter(msg.author.username, msg.author.displayAvatarURL())
			.setTimestamp();

		msg.channel.send(embedQr);
	},
};
