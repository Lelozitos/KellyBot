const Discord = require('discord.js');
const clima = require('weather-js');

module.exports = {
	name: 'clima',
	aliases: ['tempo', 'weather'],
	category: 'Utilidades',
	description: 'Mostra o clima de algum lugar em tempo real',
	cooldown: 5,
	usage: '<local>',

	run: async (bot, msg, args) => {
		let tipoDeMedidaClima = 'C';
		clima.find(
			{
				search: args.join(' '),
				degreeType: tipoDeMedidaClima,
			},
			function (err, result) {
				if (result === undefined || result.length == 0)
					return msg
						.reply('lugar desconhecido!')
						.then((m) => m.delete({ timeout: 5000 }));

				let atual = result[0].current;
				let lugar = result[0].location;
				let forecast = result[0].forecast;

				forecast = forecast.find(({ day }) => day === atual.day);

				let nuvens;
				let corClima;

				const climas = {
					Sunny() {
						nuvens = '**:sunny: Ensolarado!**';
						corClima = '#FCFF00';
					},
					MostlySunny() {
						nuvens = '**:sunny: Praticamente ensolarado!**';
						corClima = '#FCFF00';
					},
					MostlyCloudy() {
						nuvens = '**:partly_sunny: Praticamente ensolarado!**';
						corClima = '#EFE577';
					},
					Snow() {
						nuvens = '**:cloud_snow: Nevando!**';
						corClima = '#D7D7D7';
					},
					SnowShowers() {
						nuvens = '**:cloud_snow: Neve Passageira!**';
						corClima = '#D7D7D7';
					},
					LightSnow() {
						nuvens = '**:cloud_snow: Neve leve!**';
						corClima = '#D7D7D7';
					},
					Clear() {
						nuvens = '**:sunny: Céu claro!**';
						corClima = '#00D2FF';
					},
					MostlyClear() {
						nuvens = '**:white_sun_small_cloud: Céu predominantemente claro!**';
						corClima = '#50D1F0';
					},
					Cloudy() {
						nuvens = '**:cloud: Nublado!**';
						corClima = '#D7D7D7';
					},
					PartlyCloudy() {
						nuvens = '**:partly_sunny: Parcialmete nublado**';
						corClima = '#D8DDE3';
					},
					PartlySunny() {
						nuvens = '**:white_sun_small_cloud: Parcialmente ensolarado!**';
						corClima = '#ECFF62';
					},
					LightRain() {
						nuvens = '**:white_sun_rain_cloud: Garoando!**';
						corClima = '#D7D7D7';
					},
					RainShowers() {
						nuvens = '**:cloud_rain: Chovendo!**';
						corClima = '#A8A9A9';
					},
					TStorms() {
						nuvens = '**:thunder_cloud_rain: Tempestade!**';
						corClima = '#666666';
					},
					Haze() {
						nuvens = '**:fog: Neblina!**';
						corClima = '#D8D8D8';
					},
					Fog() {
						nuvens = '**:fog: Neblina!**';
						corClima = '#D8D8D8';
					},
					Fair() {
						nuvens = '**:new_moon_with_face: Clima ameno!**';
						corClima = '#0C113B';
					},
				};

				try {
					climas[atual.skytext.split(' ').join('').split('-').join('')]();
				} catch (err) {
					msg.reply(
						'deu erro pq o cara que programou isso é burro. Dê o comando `erro` junto com a mensagem para me ajudar! ```' +
							atual.skytext +
							'```'
					);
				}

				const embedClima = new Discord.MessageEmbed()
					.setAuthor(
						`Previsão de tempo para ${atual.observationpoint} (${lugar.lat} ${lugar.long})`
					)
					.setDescription(nuvens)
					.setColor(corClima)
					.addField(
						'**:thermometer: Temperatura**',
						`**Atual:** ${atual.temperature}°${tipoDeMedidaClima}\n**Sensação:** ${atual.feelslike}°${tipoDeMedidaClima}`,
						true
					)
					.addField(
						'\u200b',
						`**Máxima:** ${forecast.high}°${tipoDeMedidaClima} \n**Mínima:** ${forecast.low}°${tipoDeMedidaClima}`,
						true
					)
					.addField('**:sweat_drops: Umidade**', atual.humidity + '%', true)
					.addField(
						'**:alarm_clock: Fuso Horário**',
						`${lugar.timezone}GMT`,
						true
					)
					.addField('**:dash: Velocidade do Vento**', atual.windspeed, true)
					.setFooter(msg.author.username, msg.author.displayAvatarURL())
					.setTimestamp();

				msg.channel.send(embedClima);
			}
		);
	},
};
