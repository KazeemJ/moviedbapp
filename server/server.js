// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
const cors = require('cors');

//var bodyParser = require('body-parser');
const { default: axios } = require('axios');
const url = 'https://api.themoviedb.org/3';
const apikey = 'ec4baaecf9772d8ef34f16dbfa93181f';

// configure app to use bodyParser()
// this will let us get the data from a POST
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

var port = process.env.PORT || 8085;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.route('/').get(function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/movies/popular').get(function(req, res) {
    console.log('started request');
    axios.get(url + '/movie/popular?api_key=' + apikey + "&page=" + req.query.page)
    .then(function(response){
        res.json(response.data);
    });
});

router.route('/search/movie').get(function(req, res) {
    console.log('started request');
    if(req.query.search === undefined){
        res.statusCode = 400;
        res.json({ message: 'please provide search query' });
    }
    axios.get(url + '/search/movie?api_key=' + apikey + '&page=' + req.query.page + '&query=' + req.query.search)
    .then(function(response){
        res.json(response.data);
    });
});

router.route('/movie/:id').get(function(req, res) {
    console.log('started request');
    axios.get(url + '/movie/' + req.params.id + '?api_key=' + apikey )
    .then(function(response){
        res.json(response.data);
    });
});
// more routes for our API will happen here
//Allow all
app.use(cors({
    origin: '*'
}));
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);