const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('secretsanta')
		.setNameLocalizations({
			de: 'wichteln',
			'es-ES': 'amigoinvisible',
			'pt-BR': 'amigosecreto',
		})
		.setDescription('Roll a Secret Santa with your friends!')
		.setDescriptionLocalizations({
			de: 'Richten Sie einen geheimen Freund unter Ihren Freunden ein!',
			'es-ES': '¡Configura un amigo secreto entre tus amigos! ',
			'pt-BR': 'Configura um amigo secreto entre seus amigos!',
		})
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addRoleOption((option) =>
			option
				.setName('role')
				.setNameLocalizations({
					de: 'rolle',
					'es-ES': 'cargo',
					'pt-BR': 'cargo',
				})
				.setDescription(
					'Role of the users who will participate in Secret Santa!'
				)
				.setDescriptionLocalizations({
					de: 'Rolle der Benutzer, die an Secret Santa!',
					'es-ES':
						'¡Cargo de las personas que participarán en el amigo secreto!',
					'pt-BR': 'Cargo das pessoas que vão participar do amigo secreto!',
				})
				.setRequired(true)
		),
	// mention = interaction.options.data[0].user;

	async run(interaction, bot) {
		let members = await interaction.guild.members.fetch();

		members = members.filter((member) => {
			member = member.roles.cache.some(
				(r) => r == interaction.options.getRole('role').id
			);
			return member;
		});

		members = members.filter((member) => {
			return !member.user.bot;
		});
		members.sort(() => Math.random() - 0.5);

		members = Array.from(members.values());

		if (members.length < 3)
			return interaction.reply('Not enough members in that role!');

		for (let i = 0; i < members.length - 2; i++) {
			members[i].send(
				`Your secret Santa is ${members[i + 1]}! Gift them well!`
			);
		}

		members[members.length - 1].send(
			`Your secret Santa is ${members[0]}! Gift them well!\nby: ${interaction.user}`
		);

		interaction.reply("Everyone has been DM'ed. Go check it!");
	},
};
