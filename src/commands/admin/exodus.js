const {
	SlashCommandBuilder,
	ChannelType,
	PermissionFlagsBits,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('exodus')
		.setNameLocalizations({})
		.setDescription('Change everyone to a voice channel')
		.setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers)
		.addChannelOption((option) =>
			option
				.setName('channel')
				.setDescription('Channel to move everyone to')
				.addChannelTypes(ChannelType.GuildVoice)
				.setRequired(true)
		),

	async run(interaction, bot) {
		const channel = interaction.options.getChannel('channel');

		interaction.member.voice.channel.members.forEach((m) => {
			m.voice.setChannel(channel);
		});

		interaction.reply(`Moved everyone to \`${channel.name}\``);
	},
};
