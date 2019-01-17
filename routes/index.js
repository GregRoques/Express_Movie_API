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

router.get('/search', function(req,res){
  res.render('search')})

router.post('/search/movie',(req,res)=>{
// submitted data from forms comes in the request object
// querystring data=> is in req.query
// posed data=> is in req.body

  const movieTitle= req.body.movieTitle;
  // res.json(req.body)
  const searchUrl=`${apiBaseUrl}/search/movie?query=${movieTitle}&api_key=${apiKey}`
  request.get(searchUrl, (error, response, body)=>{
    const parsedData = JSON.parse(body);
    res.render('now_playing',{
      imageBaseUrl,
      parsedData: parsedData.results
    })
  })
})  

module.exports = router;
