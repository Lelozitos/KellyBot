const Discord = require('discord.js');

module.exports = (bot) => {
	bot.on('messageUpdate', async (oldMessage, newMessage) => {
		let log = oldMessage.guild.channels.cache.find(
			(channel) => channel.name === 'pesadelo-de-carlos'
		);
		if (newMessage.partial || oldMessage.content === newMessage.content) return;
		if (
			!log ||
			oldMessage.author.bot ||
			oldMessage.author.id == '211931473564008448'
		)
			return;

		let embedMenEdi = new Discord.MessageEmbed()
			.setTitle('📝 Mensagem Editada')
			.addField('Mensagem Antiga: ', '```' + oldMessage.content + '```')
			.addField('Mensagem Nova: ', '```' + newMessage.content + '```')
			.addField('Canal: ', newMessage.channel)
			.setColor('#FFFF00')
			.setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL())
			.setTimestamp();

		log.send(embedMenEdi);
	});
};
