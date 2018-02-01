//CodeSchool Express Level 1

// Create a simple express node app meeting the following requirements
// Requirements
// Create an express app.
// Create a root route that returns “Hello World”
// Create a ‘/name’ route that returns your name
// Create a /redirect route that sends you to /surprise with a moved permanently status code
// Create a route that returns the current date. You will need to look up how to get the current date.

var express = require ('express');
var app = express();

app.get('/', function (request, response) {
  response.send("Hello World"); 
});
// app.listen(process.env.PORT);

app.get('/name', function (request, response){
    var name = "Candice B. Brown";
    response.send(name);
});

app.get('/surprise', function(request, response){
    response.send("SURPRISE!!!");
});

app.get('/name', function(request, response){
    response.redirect(301, '/surprise');
});

app.get('/date', function(request, response){
    var date = new Date();
    response.send(date);
});

//for Express Level 2

app.get('/cities', function(request, response){
    var cities = ['New York City', 'Toronto', 'San Diego', 'Providence', 'Boston'];
    response.json(cities);
});

// app.get('/index', function(request, response){
//   response.json(cities);
// });

// app.get('/', function(request, response){
//   response.send("Hello World");
// //   response.sendFile(__dirname + "/index.html");
// });

app.use(express.static('public/'));

app.listen(process.env.PORT);




