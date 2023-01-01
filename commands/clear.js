const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('clears a set amount of messages'),
	async execute(interaction) {
		interaction.channel.bulkDelete(50)
        .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
        .catch(console.error)

        await interaction.reply(" 5 message deleted")
        await interaction.deleteReply();
	},
};