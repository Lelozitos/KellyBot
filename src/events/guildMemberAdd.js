const Discord = require('discord.js');

module.exports = (bot) => {
	bot.on('guildMemberAdd', async (membro) => {
		let log = membro.guild.channels.cache.find(
			(channel) => channel.name === 'member-log'
		);
		if (!log || membro.user.bot) return;

		let data = Math.floor(
			(Date.now() - membro.user.createdAt.getTime()) / 86400000
		);
		let embedMembroAdd = new Discord.MessageEmbed()
			.setTitle('🙋‍♂️| Novo Membro')
			.setDescription(`🙎‍♂️| <@${membro.user.id}>\n📆| ${data} dias no Discord`)
			.setColor('#008000')
			.setThumbnail(membro.user.displayAvatarURL())
			.setTimestamp();

		log.send(embedMembroAdd);
	});
};
