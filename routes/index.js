var express = require('express');
var router = express.Router();
const request = require('request')

const apiKey = require('../config')
const apiBaseUrl = 'http://api.themoviedb.org/3'
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300'
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`

/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(nowPlayingUrl,(error,response,body)=>{
    console.log(body)
    // console.log(typeOf(body));
    const parsedData = JSON.parse(body)
    // console.log(parsedData)
    // res.json(parsedData)

    // we now have the data from movieApi. Lets send it over to the view/EJS!
    res.render('now_playing',{
      parsedData: parsedData.results,
      imageBaseUrl: imageBaseUrl
    })
  });
  // res.render('index',{title: 'Express'});

});

module.exports = router;
