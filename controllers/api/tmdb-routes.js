const router = require('express').Router();
const { query } = require('express');
const { Movie, Reviewer, Review } = require('../../models');
const withAuth = require('../../util/auth');

router.get('/tmdb/movie/local-query', async (req, res) =>{
    try{
      const movieData = await Movie.findByPk(req.params.id, {
        include: [
          {
            model: Reviewer,
            attributes: ['movie']
         }
        ]
      });
      res.status(200).json(movieData);
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

router.get('/movie/:id', withAuth, async (req, res) => {
    try{
      res.status(200).json(remoteResponse);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);  
    }

})

router.post('/create-movie', withAuth, async (req, res) => {
  try{
    const newMovie = await Movie.create({
      title: req.body.title, 
      overview: req.body.overview, 
      release_date: req.body.releaseDate,
      id: req.body.movie_id,
      poster_path: req.body.poster_path
  })
  res.status(200).json(newMovie);
} catch(err) {
  res.status(500).json(err);
}
});

module.exports = router