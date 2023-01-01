const { SlashCommandBuilder } = require('discord.js');
const util = require('../utils.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showmostplayedchamps')
		.setDescription('shows most played champs'),
	
	async execute(interaction) {

		const tagName = interaction.user.username;
    	let retval = await util.retrive(tagName);
		let sumid = await util.getSuommnerID(retval);
		let sumchamp = await (await util.getSuommnerMostPlayed(sumid)).toString();
		sumchamp = sumchamp.split(',').join(', ');
    	return (interaction.reply(sumchamp)); 

	},
};