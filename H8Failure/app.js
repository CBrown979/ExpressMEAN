//CodeSchool Express Level 1
//run in browser: https://careerdevs-cbrown2017-cbrown979.c9users.io/cities?limit=0

// Create a simple express node app meeting the following requirements
// Requirements
// Create an express app.
// Create a root route that returns “Hello World”
// Create a ‘/name’ route that returns your name
// Create a /redirect route that sends you to /surprise with a moved permanently status code
// Create a route that returns the current date. You will need to look up how to get the current date.

var express = require ('express');
var app = express();

// app.get('/', function (request, response) {
//   response.send("Hello World"); 
// });
// // app.listen(process.env.PORT);

// app.get('/name', function (request, response){
//     var name = "Candice B. Brown";
//     response.send(name);
// });

// app.get('/surprise', function(request, response){
//     response.send("SURPRISE!!!");
// });

// app.get('/name', function(request, response){
//     response.redirect(301, '/surprise');
// });

// app.get('/date', function(request, response){
//     var date = new Date();
//     response.s                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                end(date);
// });

// //for Express Level 2 and used for Level 3 Assignment

//non dynamic - BUT fully working code
// app.get('/cities', function(request, response){
//     var cities = ['New York City', 'Toronto', 'San Diego', 'Providence', 'Boston'];
//     if (request.query.limit == 0){
//         response.json(cities);
//     }
//     else if (request.query.limit <= cities.length){
//         response.json(cities.slice(0, request.query.limit));
//     }
//     else {
//         response.status(400).json("Exceeded City Limits");
//     } 
//     // if(request.query.limit > 0){
//     //   response.json(cities.slice(0, request.query.limit));
//     // }
//     // else if (request.query.limit > cities.length) {
//     //   response.status(400).json("Exceeded City Limits");
//     // }
//     // else {
//     //   response.json(cities);
//     // }
// });
//above: non-dynamic, but fully working code

//DYNAMIC Routes below
var cities = {
    'Flushing': 'New York',
    'Charlotte': 'North Carolina',
    'Boston': 'Massachusetts',
    'Toronto': 'Canada',
    'Providence': 'Rhode Island',
};

app.get('/cities', function(request, response){
    var city = Object.keys(cities); //Object.keys() returns an array whose elements are strings corresponding to the enumerable properties found directly upon object.
    if (request.query.limit == 0){
        response.json(city);
    }
    else if (request.query.limit <= city.length){
        response.json(city.slice(0, request.query.limit));
    }
    else {
        response.status(400).json("Exceeded City Limits");
    }
});

// //Dynamic Routes II
// //Whenever we use our name parameter we want to parse it a specific way. 
// //Let's clean up our existing code so that all routes with a name parameter get the same special handling.
// //Call app.param() to intercept requests that contain an argument called 'name'. 
// //Remember app.param() takes a callback function as its second argument, which uses the same signature as a middleware.
// //Inside the app.param() callback function, call the parseCityName() function with the submitted name parameter. 
// //Set the return value to a new property in the request object called cityName.
// //Finally, call a function that moves processing to the next function in the stack.

app.param('name', function(request, response, next){
    var name = request.params.name;
    var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.cityName = city;
    next();
});

app.get('/cities/:name', function(request, response){
    var stateName = cities[request.cityName];
    if(!stateName){
        response.status(404).json("Not Found");
    }
    else{
        response.json(stateName);
    }
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