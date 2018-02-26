var express = require ('express');
var router = express.Router(); //returns router instance which an be mounted as middleware
// var app = express();

// app.use(express.static('public/'));

// var cities = require('./routes/cities');
// app.use('/cities', cities);

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

//Cities Object From Level 4 below:
var cities = {
    'Flushing': 'NY', 
    'Charlotte': 'NC',
    'San Diego': 'CA',
    'Seattle': 'WA',
    'Boston': 'MA',
    'Providence': 'RI'
};

router.route('/') //the root path relative to the path where it's mounted (app.use /cities in app.js)

.get(function(request, response){
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
}).post(parseUrlencoded, function(request, response){
    var createCity = function(city, state){
        cities[city] = state;
        return city;
    };
    if(request.body.newCity.length >=4 && request.body.newCity.state.length >=2){
        request.body.city = request.body.city[0].toUpperCase()+request.body.city.slice(1).toLowerCase();
        request.body.state = request.body.state[0].toUpperCase()+request.body.city.slice(1).toLowerCase();
        
        var newCity = createCity(request.body.city, request.body.state);
        // cities[newCity.name] = newCity.state;
        response.status(201).json(newCity);
    }
    else {
        response.status(400).json("Invalid Request");
    }
});


router.route('/:name').all(function(request, response, next){
    var name = request.params.name;
    var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.cityName = city;
    next();
})
.get(function(request, response){
    var stateName = cities[request.cityName];
    if(!stateName){
        response.status(404).json("Not Found");
    }
    else{
        response.json(stateName);
    }
})
.delete(function(request, response){
    delete cities[request.cityName];
    response.sendStatus(200)
    })
});

// app.get('/index', function(request, response){
//   response.json(cities);
// });

// app.get('/', function(request, response){
//   response.send("Hello World");
// //   response.sendFile(__dirname + "/index.html");
// });


app.listen(process.env.PORT);
