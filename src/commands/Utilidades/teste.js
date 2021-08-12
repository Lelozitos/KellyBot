const Discord = require('discord.js');
const Funcoes = require('../../functions.js');

module.exports = {
	name: 'teste',
	aliases: ['test'],
	category: 'Utilidades',
	description: 'Só um teste mesmo',
	cooldown: 0,
	usage: '[]',

	run: async (bot, msg, args) => {
		// const getApp = (guildId) => {
		// 	const app = bot.api.applications(bot.id);
		// 	if (guildId) app.guilds(guildId);
		// 	return app;
		// };
		// const commands = await getApp('827254587634352218').commands.get();
		// console.log(commands);
		// let a = [1, 2];
		// for (let i = 2; i < 11; i++) {
		// 	a.push(a[i - 2] + 2 * a[i - 1]);
		// }
		// console.log(a);
	},
};
