const Discord = require("discord.js");
const bot = new Discord.Client({ partials: ['MESSAGE'] });
const fs = require("fs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/kellydiscdashboard", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const botcfg = require("../botcfg.json");
bot.login(botcfg.token);

fs.readdirSync("./events/").forEach(event => {
    require(`./events/${event}`)(bot);
});