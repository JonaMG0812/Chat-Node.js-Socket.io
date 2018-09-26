//Importing Express
var express = require('express');
var app = express();

//Importing app into server
var server = require ('htpp').Server(app);
var io = require('socket.io')(server);

//Creating Server
server.listen(6677, function(){
    console.log("Server up in hhtp://localhost:6677");
});

