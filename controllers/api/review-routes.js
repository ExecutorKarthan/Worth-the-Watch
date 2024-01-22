const router = require('express').Router();
const { Reviewer, Review, Movie} = require('../../models');
const withAuth = require('../../util/auth');

// Route to create a new review
router.post('/create-review', withAuth, async (req, res) => {
    try{
    // Get the current date
    const createdDate = new Date();
    // Create a new review using the Review model
    const newReview = await Review.create({
        title: req.body.title,
        posted_date: createdDate,
        body: req.body.body,
        movie_id: req.body.movie_id,
        reviewer_id: req.session.reviewer_id,
    });
    // Respond with the newly created review
    res.status(200).json(newReview);
} catch(err) {
    // Error handler
    res.status(500).json(err);
}
});

// Route to delete a review by ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Delete a review with the specified ID and reviewer ID
        const deletedReview = await Review.destroy({
            where: {
                id: req.params.id,
                reviewer_id: req.session.reviewer_id,
            },
        });
        // If the review is not found, responds with 404 message
        if(!deletedReview) {
            res.status(404).json({ message: 'Error: review not found.' });
            return;
        }
        // Respond with the deleted review
        res.status(200).json(deletedReview);
    } catch(err) {
        // Error handler
        res.status(500).json(err);
    }
});

// Route to update a review by ID
router.put('/:id', withAuth, async (req, res) => {
    try{
        // Update the body of a review with the specified ID
        const updateReview = await Review.update({
            body: req.body.body,
        },{
            where: {
                id: req.params.id,
            }
        });
        // If the review is not found, responds with 404 message
        if(!updateReview) {
            res.status(404).json({ message: 'Error: review not found.' });
            return;
        }
        // Returns the updated review
        res.status(200).json(updateReview);
    } catch(err) {
        // Error handler
        res.status(500).json(err);
    }
    
});

module.exports = router;