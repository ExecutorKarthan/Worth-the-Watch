const router = require('express').Router();
const { Movie, Reviewer, Review } = require('../models');
const withAuth = require('../util/auth');

router.get('/', async (req, res) => {
  // try{
  //   const reviewData = await Review.findAll({
  //     include: [
  //       {
  //         model: Reviewer,
  //         attributes: ['username'],
  //       }
  //     ]
  //   });
  //   const reviews = reviewData.map((post) =>
  //     post.get({ plain: true })
  //   );
  try{
    const movieData = await Movie.findAll({
      
    });
    const movies = movieData.map((post) =>
      post.get({ plain: true })
    );
    res.render('home', {
        movies,
        logged_in: req.session.logged_in,
      });
  } catch(err) {
      res.status(400).json(err);
  }
});

router.get('/reviewers', withAuth, async (req, res) =>{
    try {
        const reviewerData = await Reviewer.findAll();
   
        const reviewers = reviewerData.map((post) =>
          post.get({ plain: true })
        );
   
        res.render('reviewers-list',
          reviewers,
        );
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

router.get('/reviewers/:id', withAuth, async (req, res) =>{
  try {
      const reviewsByID = await Review.findByPk({reviewer_id: req.params.id})      
 
      const reviews = reviewsByID.map((post) =>
        post.get({ plain: true })
      );
 
      res.render('reviewers-reviews',
      reviews,
      );
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/movie/:id', withAuth, async (req, res) =>{
  try {
      const movieByID = await Movie.findByPk({id: req.params.id})      

      const movie = movieByID.get({ plain: true })
  
      res.render('movie',
      movie,
      );
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
     const reviewerData = await Reviewer.findByPk(req.session.reviewer_id, {
      include: [{model: Review}],
    });
    const reviewer = reviewerData.get({ plain: true });

    const reviews = reviewer.reviews
      res.render('dashboard', {
        reviews, 
        logged_in: req.session.logged_in,
      });
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/search-results-list', async (req, res) => {
  try {
    const query_results = req.session.query_results
    res.render('search-results', {
      results: query_results.results,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/check-reviews/:id', withAuth, async (req, res) =>{
  try{
    const reviewData = await Review.findAll({
      where: {
        movie_id: req.params.id}
      ,
      include: [
        {
          model: Movie,
          model: Reviewer,
        }
      ]
    });
    const reviews = reviewData.map((post) =>
      post.get({ plain: true })
    );
    res.render('movie\'s-reviews',{
      reviews,
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);  
}
})

router.get('/movie-import/:id', withAuth, async (req, res) =>{
  try{
    var TMDBUrl = 'https://api.themoviedb.org/3/movie/'+ req.params.id
    const remoteResponse = await fetch(TMDBUrl, {
      method:'GET',
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.BEARER_TOKEN}`},
      }).then((response) => response.json())

    const movie = remoteResponse
    res.render('create-review',{
      movie,
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);  
}
})

router.get('/add-movie', withAuth, async(req,res) => {
  try{res.render("create-review");}
  catch(err){
    console.log(err);
  }
})

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).json(err);
      } else {
        res.render('logout');
      }
    })
  } else {
    res.redirect('/');
  }
});

//Export the newly adjusted router
module.exports = router;