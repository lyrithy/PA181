/**
 * The main application module
 */
 
// Module dependencies
var express = require('express')
  , http = require('http')
  , service = require('./service');

// setup middleware
var app = express();
app.use(app.router);
app.use(express.errorHandler());
app.use(express.static(__dirname + '/public')); // setup static public directory
app.set('view engine', 'ejs'); // use ejs as the default template rendering engine 
app.set('views', __dirname + '/views'); 

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);

// start the app
app.listen(port, host);
console.log('BlueBooking started on port ' + port);

// Main app page
app.get('/', function(req, res){
  res.render('index');
});

// Hotel search results 
app.get('/hotels', function(req, res){
  // get the request parameters
  var city = req.query.city;
  // the date string is in mm/dd/yyyy format
  var fromDateStr = req.query.from;
  var toDateStr = req.query.to;
  // parse the date string in UTC timezone
  var fromDate = Date.UTC(fromDateStr.split('/')[2], fromDateStr.split('/')[0]-1, fromDateStr.split('/')[1]);
  var toDate = Date.UTC(toDateStr.split('/')[2], toDateStr.split('/')[0]-1, toDateStr.split('/')[1]);
  service.getResults(city, fromDate, toDate, function(results){
    // render the page with data
    res.render('hotels', {"city": city, "from": req.query.from, "to": req.query.to, "results": results});
  });
});