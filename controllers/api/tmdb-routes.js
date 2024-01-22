const router = require('express').Router();
const { query } = require('express');
const { Movie, Reviewer, Review } = require('../../models');
const withAuth = require('../../util/auth');

// Route for the local database query by movie title
router.get('/movie/local-query/:id', async (req, res) =>{
    try{
      // Log the query for the database
      console.log("Route query for the database ", req.params.id.replace("+", " "))
      // Find movies in the local database with the given title
      const movieData = await Movie.findAll({
        where: {
          title: req.params.id.replaceAll("+", " "),
        }
      });
      // Save query results to the session and responds with movie data
      const localMovie = {results: movieData}
      req.session.save(() => {
        req.session.query_results = localMovie;
        res.status(200).json(movieData);
    });
    } catch (err) {
      // Error handler
      res.status(500).json(err);
    }
  });

  // Route for remote movie query using The Movie DB API
  router.get('/movie/remote-query/:id', async (req, res) =>{
    try{
        // API URL for movie search
        var TMDBUrl = 'https://api.themoviedb.org/3/search/movie?query='+ req.params.id
        // Fetch remote response from TMDB API
        const remoteResponse = await fetch(TMDBUrl, {
            method:'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.BEARER_TOKEN}`},
        }).then((response) => response.json())
        // Save query results to the session and respond with the remote response
        req.session.save(() => {
          req.session.query_results = remoteResponse;
          res.status(200).json(remoteResponse);
      });
    } catch (err) {
      // Error handler
      res.status(500).json(err);
    }
  });

// Route to create a new movie
router.post('/create-movie', withAuth, async (req, res) => {
  try{
    // Creates a new movie using the provided data
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
  // Respond with the newly created movie
  res.status(200).json(newMovie);
} catch(err) {
  // Error handler
  res.status(500).json(err);
}
});

module.exports = router