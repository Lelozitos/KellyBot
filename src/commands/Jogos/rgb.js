const Discord = require('discord.js');
const Funcoes = require('../../functions.js');
const Canvas = require('canvas');

module.exports = {
	name: 'rgb',
	aliases: ['cor'],
	category: 'Jogos',
	description: 'Tente adivinhar a cor somente pelo RGB (ou Hex)',
	cooldown: 5,
	usage: '[]',

	run: async (bot, msg, args) => {
		let cores = [];

		let canvas = Canvas.createCanvas(480, 320);
		let ctx = canvas.getContext('2d');

		gerarCores(4, cores);
		console.log(cores);
		let cor = cores[0];

		const imagem = new Discord.MessageAttachment(canvas.toBuffer(), 'rgb.png');

		let embedRgb = new Discord.MessageEmbed()
			.setColor('#7B7D7D')
			.setTitle('**🎨 RGB**')
			.setDescription(
				`**HEX: ${cor.hex}\nRGB: ${cor.red}, ${cor.green}, ${cor.blue}**`
			)
			.attachFiles(imagem)
			.setImage('attachment://rgb.png')
			.setFooter(msg.author.username, msg.author.displayAvatarURL());

		msg.channel.send(embedRgb);
	},
};

function gerarCores(n, cores) {
	const rgbToHex = (r, g, b) =>
		'#' +
		[r, g, b]
			.map((x) => x.toString(16).padStart(2, '0'))
			.join('')
			.toUpperCase();

	for (let i = 0; i < n; i++) {
		let cor = {
			red: parseInt(Math.random() * 256),
			green: parseInt(Math.random() * 256),
			blue: parseInt(Math.random() * 256),
		};
		cor.hex = rgbToHex(cor.red, cor.green, cor.blue);

		cores.push(cor);
	}
}
