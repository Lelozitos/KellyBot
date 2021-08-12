module.exports = {
	detectarMencao: function (msg, toFind) {
		let mencao = msg.guild.members.cache.get(toFind);

		if (!mencao && msg.mentions.members) mencao = msg.mentions.members.first();

		if (!mencao) mencao = msg.member;

		return mencao;
	},

	detectarReacao: async function (msg, author, time, validReactions) {
		time *= 1000;

		//for (const reaction of validReactions) await msg.react(reaction);
		validReactions.forEach((r) => {
			msg.react(r);
		});

		// if (Array.isArray(author)) {
		// 	var coletado = [];
		// 	author.forEach((a) => {
		// 		const filter = (reaction) =>
		// 			validReactions.includes(reaction.emoji.name);
		// 		msg
		// 			.awaitReactions(filter, { max: 1, time: time })
		// 			.then((collected) => coletado.push(collected.first().emoji.name));
		// 	});
		// 	return coletado;
		// } else {
		// 	const filter = (reaction, user) =>
		// 		validReactions.includes(reaction.emoji.name) && user.id === author.id;
		// 	return msg
		// 		.awaitReactions(filter, { max: 1, time: time })
		// 		.then((collected) => collected.first().emoji.name);
		// }

		const filter = (reaction, user) =>
			validReactions.includes(reaction.emoji.name) && user.id === author.id;

		return msg
			.awaitReactions(filter, { max: 1, time: time })
			.then((collected) => {
				if (collected.first() === undefined) return;
				return collected.first().emoji.name;
			});
	},

	base64toPNG: function (data) {
		data = data.split(';base64,').pop();

		const fs = require('fs');
		fs.writeFile('image.png', data, { encoding: 'base64' }, function (err) {
			console.log('File created');
		});
	},
};
