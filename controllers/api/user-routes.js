const router = require('express').Router();
const { Reviewer, Review } = require('../../models');
const withAuth = require('../../util/auth');


router.post('/', async (req, res) => {
    try{
        const reviewerData = await Reviewer.create(req.body);

        req.session.save(() => {
            req.session.reviewer_id = reviewerData.id;
            req.session.logged_in = true;
            res.status(200).json(reviewerData);
        });
    } catch(err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try{
        const reviewerData = await Reviewer.findOne({ where: { email: req.body.email }});

        if(!reviewerData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password.' })
            return;
        }

        const validPassword = await reviewerData.checkPassword(req.body.password);

        if(!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password.' })
            return;
        }

        req.session.save(() => {
            req.session.reviewer_id = reviewerData.id;
            req.session.logged_in = true;

            res.json({ reviewer: reviewerData, message: 'You have successfully logged in!' });
        });
    } catch(err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;