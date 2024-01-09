const router = require('express').Router();
const { Reviewer, Review } = require('../models');
const withAuth = require('../utilities/auth');

router.get('/reviewers', withAuth, async (req, res) =>{
    try {
        const reviewerData = await Reviewer.findAll();
    
        const reviewers = reviewerData.map((post) =>
          post.get({ plain: true })
        );
    
        res.render('reviewers-list');
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});