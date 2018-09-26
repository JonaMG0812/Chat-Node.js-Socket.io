/* index.js Server */
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 6677;

/*Loading HTML on clients*/
app.use(express.static('./client'));

app.get('/route',function(req,res){
	res.status(200).send('Everything is awesome!');
});

/*Array messages */
var messages = [{
	id: 1,
	text: 'Welcome to this private chat room',
	nickname: 'Bot - Jeeves'
}];

io.on('connection', function(socket){
	/* Open the connection to the socket */
	console.log("Node: " + socket.handshake.address + " has been connected");
	/* Sending message to the nodes */
	socket.emit('messages',messages);
	/* Receiving event */
	socket.on('add-message', function(data){
		/* Saving object in array */ 
		messages.push(data);
		/*Emit array updated*/
		io.sockets.emit('messages', messages); 
	});
}); 

server.listen(port,function(){
	console.log('The server is running in http://localhost:' + port);
});