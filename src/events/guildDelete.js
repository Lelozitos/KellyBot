const GuildCfg = require('../database/schemas/GuildConfig');

module.exports = (bot) => {
	bot.on('guildDelete', async (server) => {
		const serverCfg = await GuildCfg.deleteOne({
			guildId: server.id,
		});
	});
};
