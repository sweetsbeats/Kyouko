const Discord = require('discord.js');

const client = new Discord.Client();		//creates the discord client (obviously)

var data = require('./data.json');			//get the token from json
var token = data.token;

//			start up things
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
//			checks every new message
client.on('message', msg => {
  if (msg.content.charAt(0) === '!') {		//checks if new message contains command char
	  
	 var m = msg.content.slice(1);			//cut off command char					
//			Starts checking for implemented commands
//ASS	
	  if ( m === "ass") {
		 msg.reply('gimmi');
		 
//LOBBY
	 } else if (m === 'lobby') {
		 var ch = msg.channel;
		 msg.channel.send('\n Lobby Name: ..... \nPassword: ...');
		 
//D## 
	} else if (m.charAt(0) === 'd') {
		 var m = m.slice(1);
		 var n = Number(m);
		 var ret = Math.floor((Math.random() * n) + 1);
		
		 var ch = msg.channel;
		 ch.send(String(ret));
//HELP
	 } else if ( m === 'help') {
		 msg.author.sendMessage(String(helpmsg));
	 }
  }
});
client.login(token);		//Passes API token to Discord

var helpmsg = ` 
		 List of Commands:
		 
		 help: 'No shit theres a help function you numb-nutter'
		 lobby: 'Gets current OJ lobby info'
		 d##:   'Dice rolls of any sided die you please'
		 ass:   'Gives kyouko a craving for your ass'
		`; 	 