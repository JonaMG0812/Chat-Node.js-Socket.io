/* main.js Client */

/*Forcing connection */
var socket = io.connect('http://localhost:6677',{'forceNew':true});

/* Receiving from the server */
socket.on('messages', function(data){
	console.log(data);
	render(data);
});

/*Rendering messages */
function render(data){
	var html = data.map(function(message,index){
		return(`
				<strong>${message.nickname}</strong> says: 
				<p>${message.text}</p>
			`);
	}).join(' ');
	var div_msgs = document.getElementById('messages');
	div_msgs.innerHTML = html;
	div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
	var message = {
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value
	};
	/*Hiding Nickname form section*/
	document.getElementById('form-nickname').style.display= 'none';
	/*Event from the client to the server*/
	socket.emit('add-message', message);
	/*Stop server execution */
	return false;
}