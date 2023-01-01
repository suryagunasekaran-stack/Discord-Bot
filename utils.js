const Sequelize = require('sequelize');
var request = require('request');
const { leagueToken } = require('./config.json');

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

async function retrive(username) {

	const tagName = username;
	// equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
	const tag =  await Tags.findOne({ where: { name: username } });
	if (tag) {
		return (tag.get("username"));
	}
	return (`Could not find tag: ${tagName}`);
}

function testing() {
	return "hello"
}

async function getSuommnerID(summonerName) {

	var url = "https://oc1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName + "?api_key=" + leagueToken;
	
	//fetch info 
	const summonerid = await fetch(url)
  	.then((response) => response.json())
  	.then((data) => {return data.id});
	
	return summonerid;
}

async function getSuommnerMostPlayed(summonerid) {
	
	var url = "https://oc1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + summonerid + "/top?api_key=" + leagueToken;
	//fetch info 
	var topchamps = [];
	var tmp = await fetch(url)
  	.then((response) => response.json())
  	.then((data) => {return data});
	
	tmp.forEach(element => {
		topchamps.push(element.championId);
	});

	var mostplayed = await covertChampNumtoChampTxt(topchamps);
	return mostplayed;
}

async function covertChampNumtoChampTxt ( listofchampId ) {

	var newlist = []
	var url = "https://ddragon.leagueoflegends.com/cdn/12.22.1/data/en_US/champion.json";
	var tmp = await fetch(url)
  	.then((response) => {return response.json()});
	let list = tmp.data;
	listofchampId.forEach(element => {
		for (var i in list) {
			if(list[i].key == element) {
				newlist.push(list[i].id);
			}
		}
	});
	return newlist;
}


module.exports = { retrive, getSuommnerID, testing, getSuommnerMostPlayed };