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

				// Probably not efficient since it has to
				// load the same lang file several times

				// Subcommands and options not translated
				readdirSync('../lang')
					.filter((f) => !f.includes('en'))
					.forEach((langFile) => {
						const lang = require(`../../../lang/${langFile}`);
						const langName = lang.name;
						const { name, description } = command.data;

						command.data.name_localizations[langName] = lang[name];
						command.data.description_localizations[langName] =
							lang[description];
					});

				// console.log(command.data.name_localizations);
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
