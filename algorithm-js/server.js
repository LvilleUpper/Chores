const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const http = require("http");

/*
app.post('/', function(req, response){
    console.log(req.body);      // your JSON
    req.send("Roger!");    // echo the result back
});*/

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:58764');

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
  response.send('Hello getter!');
})

app.post('/', (request, response) => {  
    var array = request.body;
    
    for(var i=0; i< array.length; i++){
        console.log(array[i].date);
    }
    response.send(array[5].name);
    /*
    var obj = JSON.parse(str);
    response.send(obj["key"]);
    response.end("\nBye!");*/
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