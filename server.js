var express = require('express');

var port = process.env.PORT || 3000,
	app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(){
	console.log('user connected')
});

http.listen(port, function(){
	console.log('server listening on: ' + port)
});