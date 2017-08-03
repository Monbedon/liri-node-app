
// Grabs the npm libraries
	
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

// Connects the access to my twitter account
 var keys = require("./keys.js");


//access to file system//

var fs = require('fs');

// //////////////////////////////////////////////////////


var twitterKeys= keys.twitterKeys;

 //for switching, creating variable
var command = process.argv[2];

// for grabbing variable
var commandArgument = process.argv[3];

//switch

switch(command){
	case 'my-tweets':
	myTweets();
	break;

	case 'spotify-this-song':
	mySpotify(commandArgument);
	break;

	case 'movie-this':
	movieThis(commandArgument);
	break;

	case 'do-what-it-says':
		doWhatItSays();
		break; 

	default:
		console.log("Not Valid. Try again!")
}

function myTweets(){

	var client = new Twitter({
		consumer_key: twitterKeys.consumer_key,
		consumer_secret: twitterKeys.consumer_secret,
		access_token_key: twitterKeys.access_token,
		access_token_secret: twitterKeys.access_token_secret
});


client.get('statuses/user_timeline', {count: 20, trim_user: false, exclude_replies: true, include_rts: false}, 
	function(error, tweets, response) { 
		if (error) return console.log('Twitter error: ' + error);
		
		logCommand();

		for (var i=0; i<tweets.length; i++) {
			logThis(tweets[i].created_at);
			logThis(tweets[i].text);
		}
	});
}


// // // //////////////////////////////////////////

function mySpotify(receivedSong){

	var keyword = receivedSong ? receivedSong : 'The Sign Ace of Base';
	
	var spotify = new Spotify({
  		client_id: '<668006378bda4d27acad106ac420be9d>',
  		client_secret: '<ba7216a09ba34eb28a09ddc6b1847bdd>'
	});

	spotify.search({ type: 'track', query: keyword|| 'The Sign Ace of Base' }, function(err, data) {
  			if (err) {
    		return console.log('Spotify Error occurred: ' + err);
  
 
  			if (data.tracks.items.length === 0) {
  			(console.log("Song not found!")) // you had an errant semi-colon here that threw your code

  			logCommand();

  			logThis('Artist Name: ' + data.tracks.items[0].artists[0].name);
			logThis('Song Name: ' + data.tracks.items[0].name);
			logThis('Preview Link: ' + data.tracks.items[0].preview_url);
			logThis('Album Title: ' + data.tracks.items[0].album.name);
			});

	}

// //////////////////////////////////////////////////////

function movieThis(receivedMovie) {

	
	var myMovie = receivedMovie ? receivedMovie : 'Mr. Nobody';

	
	Request("http://www.omdbapi.com/?t=" + myMovie + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {

		
		if (!error && response.statusCode === 200) {

			
			logCommand();

    		
    		logThis('Movie Title: ' + JSON.parse(body).Title);
    		logThis('Release Year: ' + JSON.parse(body).Year);
    		logThis('IMDB Rating: ' + JSON.parse(body).imdbRating);
    		logThis('Production Country: ' + JSON.parse(body).Country);
    		logThis('Language: ' + JSON.parse(body).Language);
    		logThis('Plot: ' + JSON.parse(body).Plot);
    		logThis('Actors/Actresses: ' + JSON.parse(body).Actors);
    		logThis('Rotten Tomatoes Rating: ' + JSON.parse(body).tomatoRating);
    		logThis('Rotten Tomatoes URL: ' + JSON.parse(body).tomatoURL);
  		}

  	
	});

}

//////////////////////////////////////////////

function doWhatItSays() {

	
	fs.readFile('random.txt', 'utf8', function(error, data) {

	
	if (error) return console.log('Filesystem Read Error: ' + error);

	var dataObject = data.split(',');

	var myFunction = dataObject[0];
	var myArgument = dataObject[1];


	switch (myFunction) {
		case 'my-tweets':
			myFunction = 'myTweets';
			break;
		case 'spotify-this-song':
			myFunction = 'mySpotify';
			break;
		case 'movie-this':
			myFunction = 'movieThis';
			break;
		default:
			console.log('Unexpected error in doWhatItSays function');
	}

	// make sure to remove dead code
	eval(myFunction)(myArgument);

	});

}

///////////////////////////////////////

function logThis(dataToLog) {

	console.log(logData);

	
	fs.appendFile('log.txt', logData, function(err) {
		
		
		if (err) return console.log('Error logging file: ' + err);
	
	});


}

////////////////////////////////////
function logCommand() {

	
	if (commandArgument) {
		var aString = "COMMAND: node liri.js " + command + " '" + commandArgument + "'";
	} else {
		var aString = "COMMAND: node liri.js " + command;
	}

	
	fs.appendFile('log.txt', aString + '\n', function(err) {
		
		
		if (err) return console.log('Error logging command: ' + err);
	
	
	});


}
