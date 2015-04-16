var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

app.use(bodyParser.json());

function connect() {
    var connection = mysql.createConnection({
        host: '174.79.32.158:10088',
        user: 'c572709',
        password: 'c572709',
        database: 'c572709'
    });
    connection.query('USE c572709');

    return connection;
}

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/id/:id', function(req, res) {
    var sql = 'SELECT * FROM contacts WHERE id = ?';
    var query = mysql.format(sql, req.params.id);
    var connection = connect();
    connection.query(query, function(err, rows) {
        if(rows != undefined) {
            if (rows.length > 0) {
                console.log(typeof(rows));
            }
            else {
                res.status(404).end();
            }
        }
        else {
            res.status(404).end();
        }
    });
});

app.post('/', function(req, res) {
    var id = req.body.id;
    var first = req.body.first;
    var last = req.body.last;
    var extension = req.body.extension;
    var imageUrl = req.body.imageUrl;
    var office = req.body.office;
    var department = req.body.department;
    var manager = req.body.manager;
    var inserts = [id, first, last, extension, imageUrl, office, department, manager];

    console.log(inserts);

    var sql = 'INSERT INTO contacts VALUES (??, ??, ??, ??, ??, ??, ??, ??)';
    var query = mysql.format(sql, inserts);
    var connection = connect();

    connection.query(query, function(err, result) {
        if(err) {
            throw err;
        }

        connection.end();

        res.status(200).end();
    });
});

app.delete('/id/:id', function(req, res) {

});

app.put('/id/:id', function(req, res) {

});

var server = app.listen(8001, function () {

    var port = server.address().port;

    console.log('Example app listening at http://localhost:%s', port);

});