var express = require('express');
var http = require('http').Server(app);

var port = process.env.PORT || 3000,
	app = express();

app.user(express.static(__dirname + '/public'));

http.listen(port, function(){
	console.log('server listening on: ' + port)
});