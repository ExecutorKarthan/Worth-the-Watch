const router = require('express').Router();
const { Reviewer, Review } = require('../../models');
const withAuth = require('../../util/auth');

router.post('/create-review', withAuth, async (req, res) => {
    try{
        console.log(req.body)
        console.log(req.session.reviewer_id)
    const createdDate = new Date();
    const newReview = await Review.create({
        title: req.body.title,
        posted_date: createdDate,
        body: req.body.body,
        reviewer_id: req.session.reviewer_id,
    });
    res.status(200).json(newReview);
} catch(err) {
    res.status(500).json(err);
}
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedReview = await Review.destroy({
            where: {
                id: req.params.id,
                reviewer_id: req.session.reviewer_id,
            },
        });
        if(!deletedReview) {
            res.status(404).json({ message: 'Error: review not found.' });
            return;
        }
        res.status(200).json(deletedReview);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try{
        const updateReview = await Review.update({
            where: {
                id: req.params.id,
                reviewer_id: req.session.reviewer_id,
            },
        });
        if(!updateReview) {
            res.status(404).json({ message: 'Error: review not found.' });
            return;
        }
        res.status(200).json(updateReview);
    } catch(err) {
        res.status(500).json(err);
    }
    
});

module.exports = router;