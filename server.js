var express = require('express');
var moment = require('moment');

var port = process.env.PORT || 3000,
	app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

//memory cache
var clientInfo = {};
//event on 'connection'
io.on('connection', function(socket){
	console.log('user connected')
//event on 'disconnect' leave room msg emit
	socket.on('disconnect', function (){
		var userData = clientInfo[socket.id];
		if(typeof userData !== 'undefined'){
			socket.leave(userData.room);
			io.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' has left',
				timestamp: moment().valueOf()
			});
			delete clientInfo[socket.id];
		}
	});

//broadcast is for everyone
	socket.on('joinRoom', function (req) {
		clientInfo[socket.id] = req
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined!',
			timestamp: moment().valueOf()
		})
	});
//io.to is specific
	socket.on('message', function (message){
		console.log('Message received: ' + message.text);
		//send to everyone excluding sender
		//socket.broadcast.emit('message', message);
		message.timestamp = moment().valueOf();
		io.to(clientInfo[socket.id].room).emit('message', message);
	});
//socket.emit is for everyone
	socket.emit('message', {
		name: 'System login on',
		text: 'Welcome to chat application!',
		timestamp: moment().valueOf()
	})
});

http.listen(port, function(){
	console.log('server listening on: ' + port)
});