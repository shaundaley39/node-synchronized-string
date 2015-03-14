'use strict';

var redis_client = require('redis').createClient();
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var noteRoutes = require('./api/routes/noteRoutes');

app.use(bodyparser.json());
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

app.get('/api/v1/notes', noteRoutes.collection);
app.post('/api/v1/notes',  noteRoutes.create);
app.get('/api/v1/notes/:id', noteRoutes.findById);
app.put('/api/v1/notes/:id', noteRoutes.update);
app.delete('/api/v1/notes/:id', noteRoutes.destroy);
mongoose.connect('mongodb://localhost/notes-development');

http.listen(app.get('port'), function() {
  console.log('Server running on ' + app.get('port'));
});
