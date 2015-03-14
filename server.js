'use strict';

var redis_client = require('redis').createClient();
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static( __dirname + '/dist'));
app.set('port', process.env.PORT || 80);


app.get('/', function(req, res){
  res.sendFile(__dirname +'/index.html');
});

io.on('connection', function(socket){
  socket.on('x', function(value){
    redis_client.set("x", value, function(err, reply) {
      console.log(reply);                                // here we need to handle possible errors - we assume the reply is OK
      io.emit('x', value);
    });
  });
});

http.listen(app.get('port'), function() {
  console.log('Server running on ' + app.get('port'));
});
