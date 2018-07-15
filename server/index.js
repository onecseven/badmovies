var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var db = require('../server/database.js')
var api = require('./apiHelpers.js');
var morgan = require('morgan')
app.use(bodyParser.json());
app.use(morgan('combined'))
// https://api.themoviedb.org/3/movie/550?api_key=68776d9007e541c8323e90b4c8110a17
// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

app.get('/search', function(req, res) {
    let id = req.param('id');
    api.searchByGenre(id).then(({data}) => res.send(data)).catch(err => console.error(err))
});

app.get('/faves', function(req, res) {
    let id = req.param('id');
    db.getAllFavorites((data) => res.send(data))
});


app.post('/save', function(req, res) {
    db.saveFavorite(req.body.movie, (data) => res.send(data))
});

app.post('/delete', function(req, res) {
    db.deleteFavorite(req.body.movie, (data) => res.send(data))
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
