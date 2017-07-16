console.log("working");
// Grabs the twitter data from keys

var Twitter = require('twitter');
var keys = require("./keys.js");

// var Spotify = require('node-spotify-api');
// var request = require('request');


////////////////////////////////////

var myTweets = new Twitter(keys);

var params = {from:'MyTweetsForNow', count: 3
};


myTweets.get('statuses/user_timeline', params, gotData); 

function gotData(error, data, response){
	var tweets =data.statuses;
	for (var i= 0; i < tweets.length; i++)
		console.log(tweets[i].text);

// 	if(!error){
// 		console.log(tweets);
// 	}
// 	else{
// 		throw error
	};
// });




// request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&?apikey=40e9cece"), function(error, response, body) {

//   // If the request was successful
//   if (!error && response.statusCode === 200) {

//     // log the body from the site
//     console.log('body:', body);
//     console.log('error:', error);
//   }
// };

