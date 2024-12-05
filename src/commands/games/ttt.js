const {
	SlashCommandBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require('discord.js');

// Inspired on npmjs.com/package/discord-tictactoe

// Finding trouble regarding the difference between interaction.editReply() && interaction.update()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ttt')
		.setNameLocalizations({})
		.setDescription('Tic Tac Toe')
		.setDescriptionLocalizations({})
		.addUserOption((option) =>
			option.setName('user').setDescription('User to fetch their avatar')
		),

	async run(interaction, bot, lang) {
		await interaction.reply({
			content: `🎲 \`${interaction.user.username}\` VS \`a\`\n\n${interaction.user}, ${lang['your turn']}`,
			components: [
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId('ttt_0')
						.setLabel('ㅤ')
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId('ttt_1')
						.setLabel('ㅤ')
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId('ttt_2')
						.setLabel('ㅤ')
						.setStyle(ButtonStyle.Secondary)
				),
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId('ttt_3')
						.setLabel('ㅤ')
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId('ttt_4')
						.setLabel('ㅤ')
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId('ttt_5')
						.setLabel('ㅤ')
						.setStyle(ButtonStyle.Secondary)
				),
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId('ttt_6')
						.setLabel('ㅤ')
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId('ttt_7')
						.setLabel('ㅤ')
						.setStyle(ButtonStyle.Secondary),
					new ButtonBuilder()
						.setCustomId('ttt_8')
						.setLabel('ㅤ')
						.setStyle(ButtonStyle.Secondary)
				),
			],
		});
	},

	async ttt(interaction, bot, lang, num) {
		const AI = {
			user: lang['the AI'],
		};

		const mention = interaction.options?.getUser('user') || AI;

		const board = [[], [], []];
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				const button = interaction.message.components[i].components[j];

				board[i][j] = button.data.label;
			}
		}

		let count = 0;
		for (let i = 0; i < 3; i++) {
			count += board[i].filter((el) => el === 'ㅤ').length;
		}

		// check how many 'ㅤ' there is => odd X plays => even O plays
		board[Math.floor(num / 3)][num % 3] = count % 2 ? 'X' : 'O';

		const styles = {
			X: ButtonStyle.Primary,
			O: ButtonStyle.Danger,
			ㅤ: ButtonStyle.Secondary,
		};
		const disabled = {
			X: true,
			O: true,
			ㅤ: false,
		};

		let winner = checkWinner(board, count);
		let isOver = winner == undefined ? false : true;
		winner = winner == 'Draw' ? lang['Draw'] : winner;

		// await interaction.deferReply();
		interaction.update({
			content: `🎲 \`${interaction.user.username}\` VS \`a\`\n\n${
				count % 2 ? mention.user : interaction.user
			}, ${lang['your turn']}`,
			components: [
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId('ttt_0')
						.setLabel(board[0][0])
						.setStyle(styles[board[0][0]])
						.setDisabled(isOver || disabled[board[0][0]]),
					new ButtonBuilder()
						.setCustomId('ttt_1')
						.setLabel(board[0][1])
						.setStyle(styles[board[0][1]])
						.setDisabled(isOver || disabled[board[0][1]]),
					new ButtonBuilder()
						.setCustomId('ttt_2')
						.setLabel(board[0][2])
						.setStyle(styles[board[0][2]])
						.setDisabled(isOver || disabled[board[0][2]])
				),
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId('ttt_3')
						.setLabel(board[1][0])
						.setStyle(styles[board[1][0]])
						.setDisabled(isOver || disabled[board[1][0]]),
					new ButtonBuilder()
						.setCustomId('ttt_4')
						.setLabel(board[1][1])
						.setStyle(styles[board[1][1]])
						.setDisabled(isOver || disabled[board[1][1]]),
					new ButtonBuilder()
						.setCustomId('ttt_5')
						.setLabel(board[1][2])
						.setStyle(styles[board[1][2]])
						.setDisabled(isOver || disabled[board[1][2]])
				),
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId('ttt_6')
						.setLabel(board[2][0])
						.setStyle(styles[board[2][0]])
						.setDisabled(isOver || disabled[board[2][0]]),
					new ButtonBuilder()
						.setCustomId('ttt_7')
						.setLabel(board[2][1])
						.setStyle(styles[board[2][1]])
						.setDisabled(isOver || disabled[board[2][1]]),
					new ButtonBuilder()
						.setCustomId('ttt_8')
						.setLabel(board[2][2])
						.setStyle(styles[board[2][2]])
						.setDisabled(isOver || disabled[board[2][2]])
				),
			],
		});

		// minimax https://www.youtube.com/watch?v=l-hh51ncgDI
		if (mention.id != undefined && count !== 0) return; // If real player2 return
		return;

		const left = [];
		for (let j = 0; j < 3; j++) {
			const leftIndexes = board[j]
				.map((space, i) => (space === 'ㅤ' ? i : -1))
				.filter((index) => index !== -1);
			left.push(leftIndexes);
		}
		console.log('left', left);

		// GET RANDOM INT FROM [LEFT] AND ADD TO [BOARD] --- just that

		count--;

		winner = checkWinner(board, count);
		isOver = winner == undefined ? false : true;
		winner = winner == 'Draw' ? lang['Draw'] : winner;

		interaction.editReply({
			content: `🎲 \`${interaction.user.username}\` VS \`a\`\n\n${
				count % 2 ? mention.user : interaction.user
			}, ${lang['your turn']}`,
			components: [
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId('ttt_0')
						.setLabel(board[0][0])
						.setStyle(styles[board[0][0]])
						.setDisabled(isOver || disabled[board[0][0]]),
					new ButtonBuilder()
						.setCustomId('ttt_1')
						.setLabel(board[0][1])
						.setStyle(styles[board[0][1]])
						.setDisabled(isOver || disabled[board[0][1]]),
					new ButtonBuilder()
						.setCustomId('ttt_2')
						.setLabel(board[0][2])
						.setStyle(styles[board[0][2]])
						.setDisabled(isOver || disabled[board[0][2]])
				),
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId('ttt_3')
						.setLabel(board[1][0])
						.setStyle(styles[board[1][0]])
						.setDisabled(isOver || disabled[board[1][0]]),
					new ButtonBuilder()
						.setCustomId('ttt_4')
						.setLabel(board[1][1])
						.setStyle(styles[board[1][1]])
						.setDisabled(isOver || disabled[board[1][1]]),
					new ButtonBuilder()
						.setCustomId('ttt_5')
						.setLabel(board[1][2])
						.setStyle(styles[board[1][2]])
						.setDisabled(isOver || disabled[board[1][2]])
				),
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId('ttt_6')
						.setLabel(board[2][0])
						.setStyle(styles[board[2][0]])
						.setDisabled(isOver || disabled[board[2][0]]),
					new ButtonBuilder()
						.setCustomId('ttt_7')
						.setLabel(board[2][1])
						.setStyle(styles[board[2][1]])
						.setDisabled(isOver || disabled[board[2][1]]),
					new ButtonBuilder()
						.setCustomId('ttt_8')
						.setLabel(board[2][2])
						.setStyle(styles[board[2][2]])
						.setDisabled(isOver || disabled[board[2][2]])
				),
			],
		});
	},
};

const checkWinner = (board, count) => {
	for (let i = 0; i < 3; i++) {
		if (
			board[i][0] === board[i][1] &&
			board[i][0] === board[i][2] &&
			board[i][0] !== 'ㅤ'
		) {
			return board[i][0];
		}
		if (
			board[0][i] === board[1][i] &&
			board[0][i] === board[2][i] &&
			board[0][i] !== 'ㅤ'
		) {
			return board[0][i];
		}

		// diagonal
		if (
			(board[0][0] === board[1][1] &&
				board[1][1] === board[2][2] &&
				board[1][1] !== 'ㅤ') ||
			(board[2][0] === board[1][1] &&
				board[1][1] === board[0][2] &&
				board[1][1] !== 'ㅤ')
		) {
			return board[1][1];
		}

		if (count === 0) {
			return 'Draw';
		}
	}
};
