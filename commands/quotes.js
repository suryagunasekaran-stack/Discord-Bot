const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quotes')
		.setDescription('Replies with one of Kylie\'s iconic quotes'),
	async execute(interaction) {
		const quoteList = [
			'Thats fucked up',
			'shut up retard',
			'doomas',
			'*disjoins discord*',
			'we are not the same',
			'ok boomer!',
			'dont talk to me',
			'you are a simpleton',
		  ];
		await interaction.reply(quoteList[Math.floor(Math.random() * quoteList.length)]);
	},
};