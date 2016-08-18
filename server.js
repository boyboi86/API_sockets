var express = require('express');

var port = process.env.PORT || 3000,
	app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	console.log('user connected')
	socket.on('message', function (message){
		console.log('Message received' + message.text);
		//send to everyone including sender: io.emit()
		//send to everyone excluding sender
		socket.broadcast.emit('message', message);
	});

	socket.emit('message', {
		text: 'Welcome to chat application!'
	})
});

http.listen(port, function(){
	console.log('server listening on: ' + port)
});