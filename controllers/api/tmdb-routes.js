const router = require('express').Router();
const { Reviewer, Review } = require('../../models');
const withAuth = require('../../util/auth');

router.get('/movie', withAuth, async (req, res) => {


})