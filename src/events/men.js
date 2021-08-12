const Discord = require('discord.js');
const fs = require('fs');
const GuildCfg = require('../database/schemas/GuildConfig');

const ascii = require('ascii-table');
const tabela = new ascii().setHeading('Comando', 'Status');

module.exports = (bot) => {
	bot.commands = new Discord.Collection();
	bot.aliases = new Discord.Collection();
	bot.categories = fs.readdirSync('./commands/');

	bot.categories.forEach((dir) => {
		const categorias = fs
			.readdirSync(`./commands/${dir}/`)
			.filter((f) => f.endsWith('.js'));

		for (let arquivo of categorias) {
			let puxar = require(`../commands/${dir}/${arquivo}`);

			if (puxar.name) {
				bot.commands.set(puxar.name, puxar);
				tabela.addRow(arquivo, '√');
			} else {
				tabela.addRow(arquivo, '⨉');
				continue;
			}

			if (puxar.aliases && Array.isArray(puxar.aliases))
				puxar.aliases.forEach((alias) => bot.aliases.set(alias, puxar.name));
		}
	});
	console.log(tabela.toString());

	const cooldowns = new Map();

	// bot.commands.forEach(async (c) => {
	// 	const data = {
	// 		data: {
	// 			name: `${c.name}`,
	// 			description: `${c.description}`,
	// 		},
	// 	};

	// 	await bot.api
	// 		.applications(bot.id)
	// 		.guilds('827254587634352218')
	// 		.commands.post(data);

	// 	await bot.api
	// 		.applications(bot.id)
	// 		.guilds('827254587634352218')
	// 		.commands.get(data);
	// 	console.log(comandos);
	// });

	bot.on('message', async (msg) => {
		if (msg.author.bot) return;
		if (msg.channel.type == 'dm') return;
		const serverCfg = await GuildCfg.findOne({ guildId: msg.guild.id });
		const prefixo = serverCfg.get('prefixo');
		//erro ao receber msg por dm

		if (msg.content.startsWith(prefixo)) {
			let msgArray = msg.content.slice(prefixo.length).split(' ');
			let cmd = msgArray[0].toLowerCase();
			let args = msgArray.slice(1);

			if (cmd.length == 0) return;

			let commandFile = bot.commands.get(cmd);
			if (!commandFile) commandFile = bot.commands.get(bot.aliases.get(cmd));
			if (!commandFile) return;

			if (!cooldowns.has(commandFile))
				cooldowns.set(commandFile, new Discord.Collection());

			//Ter cooldown
			//Fazer com que vips tenham menos cooldown
			const agora = Date.now();
			const timestamp = cooldowns.get(commandFile);
			const cooldownTempo = commandFile.cooldown * 1000;

			if (timestamp.has(msg.author.id)) {
				const expirar = timestamp.get(msg.author.id) + cooldownTempo;

				if (agora < expirar) {
					const tempoRestante = (expirar - agora) / 1000;

					return msg
						.reply(
							'por favor espere ' +
								tempoRestante +
								' segundo(s) para utilizar o comando `' +
								commandFile.name +
								'` de novo!'
						)
						.then((m) => m.delete({ timeout: 5000 }));
				}
			}

			timestamp.set(msg.author.id, agora);
			setTimeout(() => timestamp.delete(msg.author.id), cooldownTempo);

			try {
				commandFile.run(bot, msg, args);
				try {
					await msg.delete().catch();
				} catch (err) {
					return;
				}
			} catch (err) {
				msg.reply('houve um erro ao rodar esse comando!');
				console.log(err);
			}
		}
	});
};
