//Import modules for use
const router = require('express').Router();
const { Movie, Reviewer, Review } = require('../models');
const withAuth = require('../util/auth');

//Create a home route that will list all movies in the local database
router.get('/', async (req, res) => {
  try{
    //Find all the moves in the local database
    const movieData = await Movie.findAll({});
    //Pull their plain data
    const movies = movieData.map((post) =>
      post.get({ plain: true })
    );
    //Render the homepage and adjust the page depending on if the user is logged in or not
    res.render('home', {
      movies,
      logged_in: req.session.logged_in,
    });
  } 
  catch(err) {
    res.status(400).json(err);
  }
});

//Create a route to load the dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    //Pull all the reviews for a reviewer by searching the reviewer's ID
    const reviewerData = await Reviewer.findByPk(req.session.reviewer_id, {
      include: [{model: Review}],
    });
    //Get the plain data for the reviews
    const reviewer = reviewerData.get({ plain: true });
    //Get the reviews from the reviewer's data
    const reviews = reviewer.reviews
    //Render the dashboard and adjust the page depending on if the user is logged in or not
    res.render('dashboard', {
      reviews, 
      logged_in: req.session.logged_in,
    });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Create a route to list all the reviewers - for future development
router.get('/reviewers', withAuth, async (req, res) =>{
  try {
    //Pull all the reviewers from the database
    const reviewerData = await Reviewer.findAll({});
    //Pull their plain data
    const reviewers = reviewerData.map((post) =>
      post.get({ plain: true })
    );
    //Render the reviewers list page and adjust the page depending on if the user is logged in or not
    res.render('reviewers-list', {
      reviewers,
      logged_in: req.session.logged_in,
    });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Create a route to display a particular user's movie reviews - for future development
router.get('/reviewers/:id', withAuth, async (req, res) =>{
  try {
    //Pull all the reviews done by this reviewer, searching by their ID
    const reviewsByID = await Review.findByPk({reviewer_id: req.params.id})      
    //Pull their plain data
    const reviews = reviewsByID.map((post) =>
      post.get({ plain: true })
    );
    //Render the reviewers-reviews page and adjust the page depending on if the user is logged in or not
    res.render('reviewers-reviews', {    
      reviews,
      logged_in: req.session.logged_in,
    });
  } 
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Create a route that adds a review to a movie
router.get('/add-review/:id', withAuth, async (req, res) => {
  try {
    //Find the movie by its ID
    const movieData = await Movie.findByPk(req.params.id);
    //Get the movie's data in plain
    const movie = movieData.get({ plain: true });
    //Render the page to create a review based on the API query
    res.render('create-query-review', {
      movie,
      logged_in: req.session.logged_in,
    });
  } 
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
})

//Create a route to update a review
router.get('/review/:id', withAuth, async (req, res) => {
  try{
    //Get a review by its ID
    const reviewData = await Review.findByPk( req.params.id,{
      include: [
        {
          model: Movie,
        }
      ]
    });
    //Get the data in plain
    const review = reviewData.get({plain: true});
    //Render the update-review page with the review and the user's log in
    res.render('update-review',{review, 
      logged_in: req.session.logged_in,
    })
  }
  catch(err){
    res.status(500).json(err);
  }
});

//Create a route to display a particular movie's data in the database
router.get('/movie/:id', withAuth, async (req, res) =>{
  try {
    //Pull all the data for the movie by its ID
    const movieByID = await Movie.findByPk({id: req.params.id})      
    //Pull their plan data
    const movie = movieByID.get({ plain: true })
    //Render the movie page with the data and adjust the page depending on if the user is logged in or not
    res.render('movie', {
      movie,
      logged_in: req.session.logged_in,
    });
    } 
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Create a route to show the reviews of a given movie
router.get('/check-reviews/:id', withAuth, async (req, res) =>{
  try{
    //Store the movie's ID for use
    const movie_id = {id: req.params.id}
    //Find all the reviews for the movie in question, including their movie and reviewer data
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
    //Get the plain data
    const reviews = reviewData.map((post) =>
      post.get({ plain: true })
    );
    //Render the movies reviews in HTML
    res.render('movie\'s-reviews',{
      reviews,
      movie_id,
      logged_in: req.session.logged_in,
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);  
  }
})

//Create a route to render a list of search results that were queried 
router.get('/search-results-list', async (req, res) => {
  try {
    //Store the search results in a variable
    const query_results = req.session.query_results
    //Render the search results and adjust the page depending on if the user is logged in or not
    res.render('search-results', {
      results: query_results.results,
      logged_in: req.session.logged_in,
    });

  } 
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Create a route to import movie data from the API
router.get('/movie-import/:id', withAuth, async (req, res) =>{
  try{
    //Create a URL to query the API for movie data
    var TMDBUrl = 'https://api.themoviedb.org/3/movie/'+ req.params.id
    //Get data from the API using a bearer token
    const remoteResponse = await fetch(TMDBUrl, {
      method:'GET',
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.BEARER_TOKEN}`},
      }).then((response) => response.json())
    //Store the responded data for use
    const movie = remoteResponse
    //Render the query review, populating fields based on the API database response
    res.render('create-query-review',{
      movie,
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);  
  }
})

//Create a route to ad a move to the database when the user manually enters in the movie data
router.get('/add-movie', withAuth, async(req,res) => {
  try{
    //Render the form to enter in the movie data and adjust the page based on the user being logged in
    res.render("create-scratch-review",{
    logged_in: req.session.logged_in,
    });
  }
  catch(err){
    console.log(err);
  }
})

//Create a route to redirect the user to a login page
router.get('/login', (req, res) => {
  //If the user is logged in, take them to the dashboard. If you are not logged in, take them to the log in page
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

//Create a route to redirect to the sign up page
router.get('/signup', (req, res) => {
  res.render('signup');
});

//Create a route to log out a user, destroying their session
router.get('/logout', (req, res) => {
  //If the user is logged in, destroy the session and take them to the home page
  if (req.session.logged_in) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).json(err);
      } else {
        res.render('logout');
      }
    })
  } 
  else {
    res.redirect('/');
  }
});

//Export the newly adjusted router
module.exports = router;