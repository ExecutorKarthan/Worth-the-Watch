const router = require('express').Router();
const { Reviewer } = require('../../models');

// Route for reviewer signup
router.post('/signup', async (req, res) => {
    try {
        // Check if the username already exists
        const existingReviewer = await Reviewer.findOne({
            where: { username: req.body.username },
        });

        // If it does already exist, respond with 400 code
        if (existingReviewer) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create a new reviewer with the given data
        const reviewerData = await Reviewer.create(req.body);

        // Saves the session data and responds with the created reviewer data
        req.session.save(() => {
            req.session.reviewer_id = reviewerData.id;
            req.session.logged_in = true;
            res.status(200).json(reviewerData);
        });
    } catch (err) {
        // Error handler
        res.status(500).json(err);
    }
});

// Route for reviewer login
router.post('/login', async (req, res) => {
    try{
        // Finds the reviewer with the given username
        const reviewerData = await Reviewer.findOne({ where: { username: req.body.username }});
        // If the reviewer data is not found, responds with 400 message
        if(!reviewerData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password' })
            return;
        }
        // Check if the provided password is valid
        const validPassword = await reviewerData.checkPassword(req.body.password);
        // If the password is not valid, responds with 400 message
        if(!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password' })
            return;
        }
        // Saves the session data and responds with a success message
        req.session.save(() => {
            req.session.reviewer_id = reviewerData.id;
            req.session.logged_in = true;

            res.json({ reviewer: reviewerData, message: 'You have successfully logged in!' });
        });
    } catch(err) {
        // Error handler
        res.status(400).json(err);
    }
});

// Route for logging out
router.post('/logout', (req, res) => {
    // Checks if the reviewer is logged in
    if(req.session.logged_in) {
        // Destroys the session and responds with 204 message
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        // If not logged in, responds with 404 message
        res.status(404).end();
    }
});

module.exports = router;