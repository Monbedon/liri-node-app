
// Grabs the npm libraries
	
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

// Connects the access to my twitter account
 var keys = require("./keys.js");


//access to file system//

var fs = require('fs');

//////////////////////////////////////////////////////


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
		console.log("Not Valid")
}

function myTweets(){
	var client = new Twitter(keys);


client.get('statuses/user_timeline', {count: 20, trim_user: false}, 
	function(error, tweets, response) { 
		if (error) return console.log('Twitter error: ' + error);
		for (var i=0; i<tweets.length; i++) {
			logThis(tweets[i].created_at);
			logThis(tweets[i].text);
		}
	});
}


// // //////////////////////////////////////////

function mySpotify(){
	var spotify = new Spotify({
  		client_id: '<668006378bda4d27acad106ac420be9d>',
  		client_secret: '<ba7216a09ba34eb28a09ddc6b1847bdd>'
	});

spotify.search({ type: 'track', query: 'keyword'|| 'The Sign Ace of Base' }, 
	function(err, data) {
  	if (err) {
    	return console.log('Spotify Error occurred: ' + err);
  }
 
  	if (data.tracks.items.length > 0) {
  		var record = data.tracks.items[0];
 
        console.log(' ');
        console.log('================ Song Info ================');
        console.log('Artist: ' + record.artists[0].name);
        console.log('Name: ' + record.name);
        console.log('Link: ' + record.preview_url);
        console.log('Album: ' + record.album.name);
        console.log('===========================================');
        console.log(' ');

        app.logData(data);
      } else {
        console.log('No song data found.');
      }

    });
  }
//////////////////////////////////////////////////////

// request("http://www.omdbapi.com/?t=&y=&plot=short&?apikey=40e9cece"), function(error, response, body) {

//   // If the request was successful
//   if (!error && response.statusCode === 200) {

//     // log the body from the site
//     console.log('body:', body);
//     console.log('error:', error);
//   }
// };