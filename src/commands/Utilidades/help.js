const Discord = require('discord.js');

module.exports = {
	name: 'help',
	aliases: ['h', 'ajuda', '?', 'como'],
	category: 'Utilidades',
	description: 'Descreve todos os comandos existentes',
	cooldown: 10,
	usage: '[comando]',

	run: async (bot, msg, args) => {
		if (args[0]) {
			return pegarComando(bot, msg, args[0]);
		} else {
			return pegarTodos(bot, msg);
		}
	},
};

function pegarTodos(bot, msg) {
	const comandos = (category) => {
		return bot.commands
			.filter((cmd) => cmd.category === category)
			.map((cmd) => `- \`${cmd.name}\``)
			.join('\n');
	};

	let embedHelp = new Discord.MessageEmbed().setColor('RANDOM');

	const info = bot.categories
		.map(
			(cat) => `**${cat[0].toUpperCase() + cat.slice(1)}** \n${comandos(cat)}`
		)
		.reduce((string, category) => string + '\n' + category);

	return msg.author.send(embedHelp.setDescription(info));
}

function pegarComando(bot, msg, input) {
	let embedHelp = new Discord.MessageEmbed();

	const cmd =
		bot.commands.get(input.toLowerCase()) ||
		bot.commands.get(bot.aliases.get(input.toLowerCase()));

	let info = 'Sem informações para o comando **`' + input.toLowerCase() + '`**';

	if (!cmd) {
		return msg.channel.send(embedHelp.setColor('RED').setDescription(info));
	}

	if (cmd.name) info = `**Nome do comando**: ${cmd.name}`;
	if (cmd.aliases)
		info += `\n**Aliases**: ${cmd.aliases.map((a) => `\`${a}\``).join(', ')}`;
	if (cmd.description) info += `\n**Descrição**: ${cmd.description}`;
	if (cmd.usage) {
		info += `\n**Uso**: ${cmd.usage}`;
		embedHelp.setFooter(`Sintaxe: <> = obrigatório, [] = opcional, || = ou`);
	}

	return msg.channel.send(embedHelp.setColor('GREEN').setDescription(info));
}
