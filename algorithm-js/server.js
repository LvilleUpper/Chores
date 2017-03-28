const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const http = require("http");
const dateFormat = require("dateformat");

//DB part
const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'toatoa',
    database : 'scheduler',
    dateStrings: 'date'
});

connection.connect();

/*
app.post('/', function(req, response){
    console.log(req.body);      // your JSON
    req.send("Roger!");    // echo the result back
});*/

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:64338');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (request, response) => { 
    var date = new Date();
    var month = date.getMonth() + 1;
    console.log('Hello getter! It is currently: ' + month);
    var query = "SELECT * from schedule where MONTH(date) = "+month+" ORDER BY DATE ASC";

    connection.query(query, function(err,rows) {
        if (err){
            console.log(err);
            connection.end();
            response.send("ERROR");
            return;
        }
        //returns the rows in this month
        console.log(rows);
        response.send(rows);
    });
})

app.post('/', (request, response) => {  
    var array = request.body;

    var sql = "INSERT INTO schedule (date, k1, k2,t1,t2,v1,v2) VALUES ?";
    var values = [];
    //process JSON data into array
    for(var i=0; i< array.length; i++){
        var obj = array[i];
        var dateObj = dateFormat(obj.date, "yyyy-mm-dd");
        values[values.length] = [dateObj,obj.k1,obj.k2,obj.t1,obj.t2,obj.v1,obj.v2];
    }
    //console.log(values);

    connection.query("TRUNCATE schedule", function(err) {
        if (err){
            console.log(err);
            connection.end();
            response.send("ERROR");
            return;
        }
    });
    
    connection.query(sql, [values], function(err,rows) {
        if (err){
            console.log(err);
            connection.end();
            response.send("ERROR");
            return;
        }
        //returns results and how many rows changed
        console.log(rows);
    });
    response.send("OK");
})

app.listen(8081, (err) => {  
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log('server is listening on port: 8081');
})
/*
node /Users/michaelzman/Desktop/PROGRAMMIN\'/Web\ Projects/Upper\ Chores/algorithm-js/server.js 
*/