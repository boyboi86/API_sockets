var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'Main chatroom';
var socket = io();

console.log(name + ' wants to join ' + room);

jQuery(".room-title").text(room);

socket.on('connect', function(){
	console.log('Connected to socket.io server!');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function (message){
	var momentTimeStamp = moment.utc(message.timestamp);
	$messages = jQuery('.messages');
	$message = jQuery('<li class="list-group-item"></li>')
	console.log('New Message');
	console.log(message.text);

	$message.append('<p><strong>' + message.name + ' ' + momentTimeStamp.local().format('h:mm a') + '</strong></p>');
	$message.append('<p><strong>' + message.text + '</strong></p>');
	$messages.append($message);
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event){
	event.preventDefault();

	var $message = 'input[name=message]';

	socket.emit('message', {
		name: name,
		text: $form.find($message).val()
	});

	$form.find($message).val('');
});