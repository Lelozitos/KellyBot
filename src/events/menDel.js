const Discord = require('discord.js');
const GuildCfg = require('../database/schemas/GuildConfig');

module.exports = (bot) => {
	bot.on('messageDelete', async (msg) => {
		if (msg.channel.type == 'dm') return;
		let log = msg.guild.channels.cache.find(
			(channel) => channel.name === 'pesadelo-de-carlos'
		);
		if (msg.partial) return;
		if (!log || msg.author.bot || msg.author.id == '211931473564008448') return;
		const serverCfg = await GuildCfg.findOne({ guildId: msg.guild.id });
		const prefixo = serverCfg.get('prefixo');
		if (msg.content.startsWith(prefixo) || msg.content.startsWith('.')) return;

		const fetchedLogs = await msg.guild.fetchAuditLogs({
			limit: 1,
			type: 'MESSAGE_DELETE',
			time: '5000',
		});

		const delLog = fetchedLogs.entries.first();
		const { executor, target } = delLog;
		//https://discordjs.guide/popular-topics/audit-logs.html
		let conteudo = msg.content;

		if (!conteudo) conteudo = '***Imagem Anexada***';

		let embedMenDel = new Discord.MessageEmbed()
			.setTitle('📝 Mensagem Deletada')
			.addField('Mensagem: ', '```' + conteudo + '```')
			.setColor('#FF0000')
			.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
			.setTimestamp();

		if (delLog) {
			if (target.id === msg.author.id) {
				embedMenDel.addField('Apagado por: ', '```' + executor.tag + '```');
			}
		}

		embedMenDel.addField('Canal: ', msg.channel);

		log.send(embedMenDel);
	});
};
