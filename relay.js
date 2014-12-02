// Simple node server to relay messages from TFS to Slack

// use restify as the server
var restify = require('restify');
// use requestify as a client
var requestify = require('requestify'); 

// set these variables for your own use
var slackHost = ''; // of form https://{yourhostname}.slack.com/services/hooks/incoming-webhook?token={token}';
var channel = ''; // the channel you want your message to go to
var token = ''; // your Slack token
var hostName = ''; // host name to use when starting restify
var url = slackHost + token;
var port = 8080;

// this extracts the "text" field from the msg and sends it to Slack
function relay(msg) {
  var text;

  // parse the msg so we can grab the "text" key's value -- fortunately this value is consistent across all (current) TFS messages
  try {
    text = JSON.parse(JSON.stringify(msg)).message.text; 
  } 
  catch(err) {
    return;
  }

  // send it to Slack
  requestify.post(url, { channel : channel, text : text })
  .then(function(response) {
    // get the response body but we don't really do anything with it
    response.getBody();
  });
}

// this handles the incoming route /incoming-webhook
function processIncoming(req, res, next) {
  relay(req.params);
  // send back something to the client
  res.send('{ "ok" : "true" }');
}

// this handles the incoming route /health-check
function processHealthCheck(req, res, next) {
  // send back something to the client
  res.send('{ "ok" : "true" }');
}

// set up the server
function main() {

  // create the server
  var server = restify.createServer( { name : hostName } );
  server.use(restify.bodyParser());
  // set up the route
  server.post('/incoming-webhook', processIncoming);
  server.get('/health-check', processHealthCheck);

  server.listen(port, function() {
  });
}

// invoke main & start
main();

