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

router.get('/reviewers/:id', withAuth, async (req, res) =>{
  try {
      const reviewsByID = await Review.findAll({
        where:{
          reviewer_id: req.params.id,
        }
      })      
  
      const reviews = reviewsByID.map((post) =>
        post.get({ plain: true })
      );
  
      res.render('reviewers-reviews');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});