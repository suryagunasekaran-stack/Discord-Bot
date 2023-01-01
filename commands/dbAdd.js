const { SlashCommandBuilder } = require('discord.js');
const Sequelize = require('sequelize');

//connecting to DB
const sequelize = new Sequelize('postgres', 'suryagunasekaran', '', {
	host: 'localhost',
	dialect: 'postgres',
	logging: false,
});

const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	username: Sequelize.STRING,
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addleagueaccount')
		.setDescription('adds League account')
		.addStringOption(option =>
			option.setName('leaguename')
				.setDescription('the league account name')),
	
	async execute(interaction) {
		
        try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const tag = await Tags.create({
				name: interaction.user.username,
				username: interaction.options.getString('leaguename'),
			});

			return interaction.reply(`Tag ${tag.name} added.`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('That tag already exists.');
			}
            console.log(error)
			return interaction.reply('Something went wrong with adding a tag.');
		}
	},
};