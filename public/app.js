var name = getQueryVariable('name');
var room = getQueryVariable('room');
var socket = io();

console.log(name + 'wants to join' + room);

socket.on('connect', function(){
	console.log('Connected to socket.io server!')
});

socket.on('message', function (message){
	var momentTimeStamp = moment.utc(message.timestamp);
	console.log('New Message');
	console.log(message.text);

	jQuery('.messages').append('<p><strong>' + momentTimeStamp.local().format('h:mm a') + '<strong>' + ': ' + message.text + '</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event){
	event.preventDefault();

	var $message = 'input[name=message]';

	socket.emit('message', {
		text: $form.find($message).val()
	});

	$form.find($message).val('');
});