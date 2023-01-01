const { SlashCommandBuilder, Utils } = require('discord.js');
const util = require("../utils.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showleagueaccount')
		.setDescription('shows associated League account'),
	
	async execute(interaction) {

        const tagName = interaction.user.username;
        let retval = await util.retrive(tagName);
        return (interaction.reply(retval));

	},
};