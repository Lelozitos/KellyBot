const GuildCfg = require('../database/schemas/GuildConfig');
require('../commands/Música/tocar');

module.exports = (bot) => {
	// let online = 0;
	bot.on('voiceStateUpdate', async (antigo, novo) => {
		const server = antigo.guild || novo.guild;

		if (server.me && novo.channelID == null) {
			filaServer = fila.get(server.id);

			if (!filaServer) return;

			fila.delete(server.id);
		}

		// if (vozAntigo != vozNovo) {
		// 	if (vozAntigo == null) {
		// 		online++;
		// 		console.log(online);
		// 	} else if (vozNovo == null) {
		// 		online--;
		// 		console.log(online);
		// 	} else {
		// 		console.log('User switched channels!');
		// 	}
		// }
	});
};
