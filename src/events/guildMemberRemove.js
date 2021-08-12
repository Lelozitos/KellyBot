const Discord = require('discord.js');

module.exports = (bot) => {
	bot.on('guildMemberRemove', async (membro) => {
		let log = membro.guild.channels.cache.find(
			(channel) => channel.name === 'member-log'
		);
		if (!log || membro.user.bot) return;

		let data = Math.floor(
			(Date.now() - membro.user.createdAt.getTime()) / 86400000
		);
		let embedMembroRemove = new Discord.MessageEmbed()
			.setTitle('🤦‍♂️| Membro Saiu')
			.setDescription(`🙎‍♂️| ${membro.displayName}\n📆| ${data} dias no Discord`)
			.setColor('#FF0000')
			.setThumbnail(membro.user.displayAvatarURL())
			.setTimestamp();

		log.send(embedMembroRemove);
	});
};
