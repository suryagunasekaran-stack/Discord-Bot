const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('howlong')
		.setDescription('Tells you how many days you have been in this server'),
	async execute(interaction) {
		var timeJoined = interaction.member.joinedAt;
		var timeNow = Date.now();
		var timeTaken = Math.round((timeNow - timeJoined) / (1000*60*60*24*1),2) ;
		
		await interaction.reply(`you have been in this server for ${timeTaken} days`);
	},
};