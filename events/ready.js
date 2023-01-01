const { Events } = require('discord.js');

const Sequelize = require('sequelize');

/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255) UNIQUE,
 * username VARCHAR(255),
 * );
 */

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
	name: Events.ClientReady,
	once: true,
	execute(client) {
		Tags.sync({ force: false });
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};