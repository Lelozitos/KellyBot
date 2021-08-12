const GuildCfg = require('../database/schemas/GuildConfig');

module.exports = (bot) => {
	bot.on('guildCreate', async (server) => {
		const serverCfg = await GuildCfg.create({
			guildId: server.id,
			guildName: server.name,
		});
	});
};
