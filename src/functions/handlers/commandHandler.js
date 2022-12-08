const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9'); // ? dk what those do

const { readdirSync } = require('fs');

module.exports = async (bot) => {
	bot.categories = readdirSync('./commands');
	bot.commandArray = [];

	bot.categories.forEach((categoryFolder) => {
		readdirSync(`./commands/${categoryFolder}`)
			.filter((f) => f.endsWith('.js'))
			.forEach((commandFile) => {
				const command = require(`../../commands/${categoryFolder}/${commandFile}`);
				bot.commands.set(command.data.name, command);
				bot.commandArray.push(command.data.toJSON());
				console.log(`Command ${command.data.name} is set!`);
			});
	});

	const botUserId = '381990984277426176'; // it takes time to bot start with Id
	const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
	try {
		await rest.put(Routes.applicationCommands(botUserId), {
			body: bot.commandArray,
		});

		console.log('Slash Commands Working!');
	} catch (err) {
		console.log(err);
	}
};
