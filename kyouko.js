const Discord = require('discord.js');
const fs = require('fs');


const version = 'Ver.0.1';


const client = new Discord.Client();		//creates the discord client (obviously)

var data = require('./data.json');			//get the token from json
var token = data.token;

var serverList;                       //list of all servers client is in, set when the "ready" event is triggered

var OJServer = data.OJServer;
var OJServerSnowflake = data.OJServerSnowflake;

var lobbyName = data.lobbyName;
var password = data.password;

var logToText = data.logToText;


//			start up things
client.on('ready', () => {
    console.log(img + version + '\n');  //print the Image and version number
    console.log(`Logged in as ${client.user.tag}!`);
    serverList = client.guilds.array();
  
    console.log(`${client.user.tag} is currently in ${client.guilds.size} server(s), listed below:`);
    serverList.forEach(  (element, index, array) => {
	console.log(element.name);
    } );
});


//			checks every new message
client.on('message', msg => {
	
    if (msg.channel.type === 'dm') {
	//Don't take commands from DMs, could leak or mess with lobby info	
    } else {
	
	if (msg.content.charAt(0) === '_') {		//checks if new message contains command char
	    
	    var m = msg.content.slice(1);			//cut off command char

//			Starts checking for implemented commands
//ASS	
	    if ( m === "ass") {
		msg.reply('gimmi');	 			
		logEvent('!Ass', msg);
//LOBBY
	    } else if (m === 'lobby') {
		var ch = msg.channel;
		if (msg.guild.id === OJServerSnowflake ) {
		    msg.channel.send(`\n Lobby Name: ${lobbyName} \nPassword: ${password}`);
		} else {
		    msg.channel.send(`No lobby is set for this server.\n
                                      As for ${version} customized server lobbies do not exist. `);
		}
		
		logEvent('Lobby info grab', msg);
		 
//D## 
	    } else if (m.charAt(0) === 'd') {
		var m = m.slice(1);
		var n = Number(m);
		var ret = Math.floor((Math.random() * n) + 1);
		
		var ch = msg.channel;
		ch.send(String(ret));
		logEvent('Dice roll', msg);
//HELP
	    } else if ( m === 'help') {
		msg.author.send(String(helpmsg));
		logEvent('Help asked for', msg);
//TEST 									(For dev purposes)
	    } else if (m === 'test') {
		console.log(msg.guild.id);
	    }
	}
    }
});
client.login(token);		//Passes API token to Discord

//Takes simple description of event and the message to give a detailed description of bot usage
function logEvent(eventDescriptor, message) {
    var date = new Date();

    var log =  String(formatDate(date) + ' ' + 
		      eventDescriptor + ' from user "' + message.author.username + 
		      '" In server: "' + message.guild.name + 
		      '" In channel: "' + message.channel.name + '"');

    console.log(log );
}

function formatDate(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    
    return '[' + hours + ':' + minutes + ':' + seconds + '][' + day + ' ' + monthNames[monthIndex] + ' ' + year + ']' ;
}

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

var helpmsg = ` 
		 List of Commands:
		 
		 help:  'No shit theres a help function you numb-nutter'
		 lobby: 'Gets current OJ lobby info'
		 d##:   'Dice rolls of any sided die you please'
		 ass:   'Gives kyouko a craving for your ass'
		`; 	 
		
		var img = 
`
██╗  ██╗██╗   ██╗ ██████╗ ██╗   ██╗██╗  ██╗ ██████╗               ██████╗  ██████╗ ████████╗
██║ ██╔╝╚██╗ ██╔╝██╔═══██╗██║   ██║██║ ██╔╝██╔═══██╗              ██╔══██╗██╔═══██╗╚══██╔══╝
█████╔╝  ╚████╔╝ ██║   ██║██║   ██║█████╔╝ ██║   ██║    █████╗    ██████╔╝██║   ██║   ██║   
██╔═██╗   ╚██╔╝  ██║   ██║██║   ██║██╔═██╗ ██║   ██║    ╚════╝    ██╔══██╗██║   ██║   ██║   
██║  ██╗   ██║   ╚██████╔╝╚██████╔╝██║  ██╗╚██████╔╝              ██████╔╝╚██████╔╝   ██║   
╚═╝  ╚═╝   ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝               ╚═════╝  ╚═════╝    ╚═╝   `
