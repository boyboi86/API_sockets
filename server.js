var express = require('express');
var moment = require('moment');

var port = process.env.PORT || 3000,
	app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	console.log('user connected')

	socket.on('message', function (message){
		console.log('Message received: ' + message.text);
		//send to everyone excluding sender
		//socket.broadcast.emit('message', message);
		message.timestamp = moment().valueOf();
		io.emit('message', message);
	});

	socket.emit('message', {
		name: 'System login on',
		text: 'Welcome to chat application!',
		timestamp: moment().valueOf()
	})
});

http.listen(port, function(){
	console.log('server listening on: ' + port)
});