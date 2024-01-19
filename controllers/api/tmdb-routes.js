const router = require('express').Router();
const { query } = require('express');
const { Movie, Reviewer, Review } = require('../../models');
const withAuth = require('../../util/auth');

router.get('/movie/local-query/:id', async (req, res) =>{
    try{
      console.log("Route query for the database ", req.params.id.replace("+", " "))
      const movieData = await Movie.findAll({
        where: {
          title: req.params.id.replaceAll("+", " "),
        }
      });
      const localMovie = {results: movieData}
      req.session.save(() => {
        req.session.query_results = localMovie;
        res.status(200).json(movieData);
    });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/movie/remote-query/:id', async (req, res) =>{
    try{
        var TMDBUrl = 'https://api.themoviedb.org/3/search/movie?query='+ req.params.id
        const remoteResponse = await fetch(TMDBUrl, {
            method:'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.BEARER_TOKEN}`},
        }).then((response) => response.json())
        req.session.save(() => {
          req.session.query_results = remoteResponse;
          res.status(200).json(remoteResponse);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.post('/create-movie', withAuth, async (req, res) => {
  try{
    console.log(req.body.movie_id)
    var newMovie = ""
    if(req.body.movie_id == null){
      newMovie = await Movie.create({
        title: req.body.title.toLowerCase(), 
        overview: req.body.overview, 
        release_date: req.body.releaseDate,
        poster_path: req.body.poster_path
    })
    }
    else{
      newMovie = await Movie.create({
        title: req.body.title.toLowerCase(), 
        overview: req.body.overview, 
        release_date: req.body.releaseDate,
        id: req.body.movie_id,
        poster_path: req.body.poster_path
    })
    }
  res.status(200).json(newMovie);
} catch(err) {
  res.status(500).json(err);
}
});

module.exports = router