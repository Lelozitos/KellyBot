const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

module.exports = {
	name: 'tcs',
	aliases: [''],
	category: 'Moderação',
	description: 'Selivon... você ser mau',
	cooldown: 30,
	usage: '[]',

	run: async (bot, msg, args) => {
		if (!msg.member.hasPermission('MANAGE_ROLES'))
			return msg
				.reply('❌ você não tem permissão para usar o comando!')
				.then((m) => m.delete({ timeout: 3000 }));

		const selivon = await msg.guild.members.fetch({
			user: '768522271160926228',
			cache: false,
		});
		const cargos = [
			msg.guild.roles.cache.find((r) => r.name == 'RPG'),
			msg.guild.roles.cache.find((r) => r.name == 'Kamikazes'),
			msg.guild.roles.cache.find((r) => r.name == 'Assistidores de Filme'),
		];
		const tcs = msg.guild.roles.cache.find((r) => r.name == 'TCS');

		if (selivon.roles.cache.some((r) => r.name == 'TCS')) {
			selivon.roles.add(cargos);
			selivon.roles.remove(tcs);
			msg.channel.send('Ele foi salvo');
		} else {
			selivon.roles.remove(cargos);
			await selivon.roles.add(tcs);
			msg.channel.send('Ele foi condenado');
		}
	},
};
