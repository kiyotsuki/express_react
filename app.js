var express = require("express");
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : ''
  });

var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.use(express.static('frontend/public'));

app.get('/api/users', function(req, res, next) {
    connection.query('SELECT * from test.users', function (error, results, fields) {
        console.log(results);
        if(error){
            res.write(JSON.stringify({"error":"error"}));
            res.end();
        } else {
            res.write(JSON.stringify(results));
            res.end();
        }
    });
});

app.post('/api/users', function(req, res, next) {
    req.on('readable', function(chunk) {
        var read = req.read();
        var json = JSON.parse(read);       
        if(json == null) return;
        console.log('json:'+ JSON.stringify(json));
        
        connection.query('INSERT INTO test.users set ?',json, function (error, results, fields) {
            console.log(error);
            if(error == null) res.write('ok');
            else res.write('error');
            res.end();
        });
    });
});