require('dotenv').config(); // idk y but .env has to stay at /src
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { readdirSync } = require('fs');

//const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/kellydiscdashboard', {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

const bot = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});
bot.commands = new Collection();
bot.buttons = new Collection();
bot.selectMenus = new Collection();
bot.color = 0x7f00ff;

readdirSync('./functions').forEach((functionFolder) => {
	readdirSync(`./functions/${functionFolder}`)
		.filter((f) => f.endsWith('.js'))
		.forEach((functionFile) => {
			require(`./functions/${functionFolder}/${functionFile}`)(bot);
		});
});

bot.login(process.env.TOKEN);

// https://www.youtube.com/watch?v=6IgOXmQMT68
// https://discord.com/developers/docs/reference#locales
