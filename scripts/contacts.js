var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/id/:id', function(req, res) {

});

app.post('/', function(req, res) {

});

app.delete('/id/:id', function(req, res) {

});

app.put('/id/:id', function(req, res) {

});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://localhost:%s', host, port);

});