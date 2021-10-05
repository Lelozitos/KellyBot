const Discord = require('discord.js');

module.exports = {
	name: 'erro',
	aliases: ['problema'],
	category: 'Moderação',
	description: 'Reporta algum erro meu para o meu criador',
	cooldown: 60,
	usage: '<erro>',

	run: async (bot, msg, args) => {
		if (!args[0]) return msg.channel.send('Explique o erro com a Kelly');

		let embedErroFeito = new Discord.MessageEmbed()
			.setAuthor(msg.author.tag, msg.author.avatarURL())
			.setTitle(msg.guild.name)
			.setDescription(args.join(' '))
			.setColor('0xE52800')
			.setThumbnail(msg.guild.iconURL())
			.setTimestamp();

		bot.guilds.cache
			.get('480823864377606177')
			.channels.cache.get('693962938129580046')
			.send(embedErroFeito);
	},
};
