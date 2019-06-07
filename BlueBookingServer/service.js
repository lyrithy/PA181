/**
 * This module provides service functions
 */

// Module dependencies
var async = require('async')
  , url = require('url')
  , https = require('https');

// Retrieve the Rules Service parameters
if (process.env.VCAP_SERVICES) {
  var env = JSON.parse(process.env.VCAP_SERVICES);
  if (env['businessrules']) { // if Business Rules Service is bound
    var rules = env['businessrules'][0].credentials;
  } else {
    console.log("Error: no Business Rules Service bound to the application.");
  }
} else { 
  // for local testing
  var rules = {
	"executionRestUrl": "http://{your_execution_url}.mybluemix.net/DecisionService/rest",
	"user": "{username}",
	"password": "{password}"
  };
}

/*
 * Load the data file and search hotels in a city
 */
function findHotels(city) {
  var hotels = require(__dirname + '/data/hotels.json');
  return hotels[city];
}


/*
 * Invoke the Rules Service to calculate the rate for each of the hotels
 */
function getResults(city, fromDate, toDate, callback) {
	var results = new Array();
	var rulesetPath = '/BlueBookingRuleApp/1.0/BlueBookingRules/1.0';
	var hotels = findHotels(city);
    async.each(hotels, function(hotel, callback) {
	  var inputParams = {"hotel": hotel, "checkin": fromDate, "checkout": toDate};
	  invokeRulesService(rulesetPath, inputParams, function(responseObj) {
	    if (responseObj != null)
		  results.push(responseObj['result']);
		callback();
	  });	  
    }, function(err) {
      if (err) {
        console.log(err);
      } else {
        callback(results);
      }
    });
}


/*
 * Invoke the Rules Service to calculate the booking rates
 */
function invokeRulesService(rulesetPath, inputParams, callback) {
  var restUrl = url.parse(rules.executionRestUrl);
  var dataString = JSON.stringify(inputParams);
  // encode 'user:password' in Base64 string for basic authentication of the execution API
  var encodedCredentials = new Buffer(rules.user+':'+rules.password).toString('base64');

  headers = {
    'Content-Type': 'application/json',
    'Content-Length': dataString.length,
	'Authorization': 'Basic ' + encodedCredentials // basic authentication header
  };
  
  var options = {
    host: restUrl.host,
	path: restUrl.path + rulesetPath,
    method: 'POST',
    headers: headers
  };

  var req = https.request(options, function(resp) {
    resp.setEncoding('utf-8');
    var responseString = '';

    resp.on('data', function(data) {
      responseString += data;
    });

    resp.on('end', function() {
      console.log(responseString);
	  if (resp.statusCode == 200)
        var responseObject = JSON.parse(responseString);
      callback(responseObject);
    });
  });
  
  req.on('error', function(e) {
      console.log(e.message);
    });
  
  req.write(dataString);
  req.end();
}

// export public functions
exports.getResults = getResults;
