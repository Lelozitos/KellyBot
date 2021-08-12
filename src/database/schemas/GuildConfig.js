const mongoose = require('mongoose');

const GuildCfg = new mongoose.Schema({
	guildId: {
		type: mongoose.SchemaTypes.String,
		required: true,
		unique: true,
	},

	guildName: {
		type: mongoose.SchemaTypes.String,
		required: true,
	},

	isVip: {
		type: mongoose.SchemaTypes.Boolean,
		required: true,
		default: false,
	},

	prefixo: {
		type: mongoose.SchemaTypes.String,
		required: true,
		default: '>',
	},

	medidaTemp: {
		type: mongoose.SchemaTypes.String,
		required: true,
		default: 'C',
	},

	lang: {
		type: mongoose.SchemaTypes.String,
		required: true,
		default: 'port',
	},

	cargoPadrao: {
		type: mongoose.SchemaTypes.String,
		required: false,
	},

	memberLog: {
		type: mongoose.SchemaTypes.String,
		required: false,
	},

	channelLog: {
		type: mongoose.SchemaTypes.String,
		required: false,
	},
});

module.exports = mongoose.model('GuildConfig', GuildCfg);
