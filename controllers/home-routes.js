const router = require('express').Router();
const { Movie, Reviewer, Review } = require('../models');
const withAuth = require('../util/auth');

router.get('/', async (req, res) => {
  try{
    const reviewData = await Review.findAll({
      include: [
        {
          model: Reviewer,
          attributes: ['username'],
        }
      ]
    });
    const reviews = reviewData.map((post) =>
      post.get({ plain: true })
    );
    res.render('home', {
        reviews,
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
    const reviewerData = await Reviewer.findByPk(req.session.reviewer_id);
    const reviewer = reviewerData.get({ plain: true });
      res.render('dashboard', {
        reviewer, 
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

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

//Export the newly adjusted router
module.exports = router;
