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
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/movie/remote-query', async (req, res) =>{
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
        
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);  
    }

})

router.post('/movie-import', withAuth, async (req, res) =>{


})

module.exports = router